package com.acend.service;

import com.acend.dto.CertificationDto;
import com.acend.entity.Certification;

public interface CertificationService {

	Certification saveCertification(Certification certification, String email);

	Certification updateCertification(Long certificationId, CertificationDto certificationDto, String email);

}
