package com.acend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Skill;
import java.util.List;


@Repository
public interface SkillRepository extends JpaRepository<Skill, Long>{

	Skill findBySkillName(String skillName);
	
}
