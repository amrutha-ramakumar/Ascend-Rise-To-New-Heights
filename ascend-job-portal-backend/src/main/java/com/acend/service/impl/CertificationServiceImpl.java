package com.acend.service.impl;

import org.springframework.stereotype.Service;

import com.acend.dto.CertificationDto;
import com.acend.entity.Certification;
import com.acend.entity.Jobseeker;
import com.acend.repository.CertificationRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.UserRepository;
import com.acend.service.CertificationService;

@Service
public class CertificationServiceImpl implements CertificationService {

    private final JobseekerRepository jobseekerRepository;
    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;

    public CertificationServiceImpl(JobseekerRepository jobseekerRepository, UserRepository userRepository,
                                    CertificationRepository certificationRepository) {
        this.jobseekerRepository = jobseekerRepository;
        this.userRepository = userRepository;
        this.certificationRepository = certificationRepository;
    }

    // Save Certification
    @Override
    public Certification saveCertification(Certification certification, String email) {
        Jobseeker jobseeker = jobseekerRepository.findByUser(userRepository.findByEmail(email));
        certification.setJobseeker(jobseeker);
        return certificationRepository.save(certification);
    }

    // Update Certification
    @Override
    public Certification updateCertification(Long certificationId, CertificationDto certificationDto, String email) {
        Certification existingCertification = certificationRepository.findById(certificationId)
                .orElseThrow(() -> new RuntimeException("Certification not found"));

        existingCertification.setCertificationName(certificationDto.getCertificationName());
        existingCertification.setIssuedBy(certificationDto.getIssuedBy());
        existingCertification.setIssueDate(certificationDto.getIssueDate());
        existingCertification.setExpiryDate(certificationDto.getExpiryDate());

        return certificationRepository.save(existingCertification);
    }
}
