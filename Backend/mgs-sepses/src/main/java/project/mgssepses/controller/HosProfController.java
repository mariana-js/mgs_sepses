package project.mgssepses.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.mgssepses.dtos.HosProfDto;
import project.mgssepses.model.HosProf;
import project.mgssepses.service.HosProfService;

@RestController
@RequestMapping("/hosprof")
@CrossOrigin(origins = "http://localhost:4200")
public class HosProfController {

    final HosProfService hosProfService;
    private final Logger log = LoggerFactory.getLogger(HosProfController.class);

    public HosProfController(HosProfService hosProfService) {
        this.hosProfService = hosProfService;
    }

    @GetMapping
    public ResponseEntity<List<HosProf>> getAllHosProf() {
        return ResponseEntity.status(HttpStatus.OK).body(hosProfService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> saveHosProf(@RequestBody @Valid HosProfDto hosProfDto) {
        var hosProf = new HosProf();
        BeanUtils.copyProperties(hosProfDto, hosProf);
        return ResponseEntity.status(HttpStatus.CREATED).body(hosProfService.save(hosProf));
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/{id}")
    public ResponseEntity getOneHosProf(@PathVariable(value = "id") UUID id) {
        Optional<HosProf> hosProfOptional = hosProfService.findById(id);
        if (!hosProfOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosProf not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(hosProfOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") UUID id) {
        Optional<HosProf> hosProfOptional = hosProfService.findById(id);
        if (!hosProfOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosProf not found.");
        }
        try {
            hosProfService.delete(hosProfOptional.get());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Erro ao excluir HosProf:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir HosProf.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateHosProf(@PathVariable(value = "id") UUID id,
            @RequestBody @Valid HosProfDto hosProfDto) {
        Optional<HosProf> hosProfOptional = hosProfService.findById(id);
        if (!hosProfOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosProf not found.");
        }
        var hosProf = new HosProf();
        BeanUtils.copyProperties(hosProfDto, hosProf);
        hosProf.setId(hosProfOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(hosProfService.save(hosProf));
    }

}
