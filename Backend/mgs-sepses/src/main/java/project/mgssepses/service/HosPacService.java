package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.mgssepses.model.HosPac;
import project.mgssepses.repository.HosPacRepository;

@Service
public class HosPacService {
    final HosPacRepository hosPacRepository;

    public HosPacService(HosPacRepository hosPacRepository) {
        this.hosPacRepository = hosPacRepository;
    }

    @Transactional
      public HosPac save(HosPac hosPac){
        return hosPacRepository.save(hosPac);
    }

    public Optional<HosPac> findById(UUID id){
        return hosPacRepository.findById(id);
    }

    public List<HosPac> findAll(){
        return hosPacRepository.findAll();
    }

    public void delete(HosPac hosPac){
        hosPacRepository.delete(hosPac);
    }
    
}
