package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.Hospital;
import project.mgssepses.repository.HospitalRepository;

@Service
public class HospitalService {
    final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Hospital save(Hospital hospital){
        return hospitalRepository.save(hospital);
    }

    public Optional<Hospital> findById(UUID idHospital){
        return hospitalRepository.findById(idHospital);
    }

    public List<Hospital> findAll(){
        return hospitalRepository.findAll();
    }

    public void delete(Hospital hospital){
        hospitalRepository.delete(hospital);
    }
}
