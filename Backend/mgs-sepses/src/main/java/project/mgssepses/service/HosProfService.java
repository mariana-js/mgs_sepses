package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.mgssepses.model.HosProf;
import project.mgssepses.repository.HosProfRepository;

@Service
public class HosProfService {
    final HosProfRepository hosProfRepository;

    public HosProfService(HosProfRepository hosProfRepository) {
        this.hosProfRepository = hosProfRepository;
    }

    @Transactional
      public HosProf save(HosProf hosProf){
        return hosProfRepository.save(hosProf);
    }

    public Optional<HosProf> findById(UUID id){
        return hosProfRepository.findById(id);
    }

    public List<HosProf> findAll(){
        return hosProfRepository.findAll();
    }

    public void delete(HosProf hosProf){
        hosProfRepository.delete(hosProf);
    }
}
