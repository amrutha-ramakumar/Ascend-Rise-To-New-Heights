package com.acend.service.impl;



import com.acend.entity.SubscriptionPayment;
import com.acend.entity.UserSubscriptions;
import com.acend.entity.Users;
import com.acend.enums.PaymentStatus;
import com.acend.enums.SubscriptionStatus;
import com.acend.repository.SubscriptionPaymentRepository;
import com.acend.repository.UserRepository;
import com.acend.repository.UserSubscriptionRepository;
import com.acend.request.OrderRequest;
import com.acend.request.PaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {
    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final UserSubscriptionRepository subscriptionRepository;
    private final SubscriptionPaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public PaymentService(UserSubscriptionRepository subscriptionRepository, 
                         SubscriptionPaymentRepository paymentRepository,
                         UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.paymentRepository = paymentRepository;
       this.userRepository = userRepository;
    }


    public Map<String, Object> createOrder(OrderRequest request) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", request.getAmount());
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_" + request.getSubscriptionId());
            
            Order order = razorpay.orders.create(orderRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("receipt", order.get("receipt"));
            
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }
    }
    @Transactional
    public SubscriptionPayment savePayment(String email, PaymentRequest request) {
        Users user =userRepository.findByEmail(email);
        UserSubscriptions subscription = subscriptionRepository.findById(request.getSubscriptionId())
            .orElseThrow(() -> new RuntimeException("Subscription not found"));

        
        
        SubscriptionPayment payment = new SubscriptionPayment();
        payment.setUser(user);
        payment.setSubscription(subscription);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setTransactionId(request.getTransactionId());
        payment.setStatus(PaymentStatus.valueOf(request.getStatus()));
        payment.setPaymentDate(request.getPaymentDate());
        paymentRepository.save(payment);
        
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setStartDate(payment.getPaymentDate());
        subscription.setEndDate(payment.getPaymentDate().plus(subscription.getPlan().getDuration(), ChronoUnit.DAYS));
        subscriptionRepository.save(subscription);
        return payment;
    }


    public Double getYearlyIncome(int year) {
        return paymentRepository.getTotalIncomeByYear(year);
    }

    public Map<Integer, Double> getMonthlyIncome(int year) {
        List<Object[]> results = paymentRepository.getMonthlyIncomeByYear(year);
        Map<Integer, Double> incomeMap = new HashMap<>();
        for (Object[] row : results) {
            incomeMap.put((Integer) row[0], (Double) row[1]);
        }
        return incomeMap;
    }

    public Map<Integer, Double> getDailyIncome(int year, int month) {
        List<Object[]> results = paymentRepository.getDailyIncomeByMonth(year, month);
        Map<Integer, Double> incomeMap = new HashMap<>();
        for (Object[] row : results) {
            incomeMap.put((Integer) row[0], (Double) row[1]);
        }
        return incomeMap;
    }
}