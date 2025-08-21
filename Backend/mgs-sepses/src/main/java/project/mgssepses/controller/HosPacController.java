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
import project.mgssepses.dtos.HosPacDto;
import project.mgssepses.model.HosPac;
import project.mgssepses.service.HosPacService;

@RestController
@RequestMapping("/hospac")
@CrossOrigin(origins = "http://localhost:4200")
public class HosPacController {

    final HosPacService hosPacService;
    private final Logger log = LoggerFactory.getLogger(HosPacController.class);

    public HosPacController(HosPacService hosPacService) {
        this.hosPacService = hosPacService;
    }

    @GetMapping
    public ResponseEntity<List<HosPac>> getAllHosPac() {
        return ResponseEntity.status(HttpStatus.OK).body(hosPacService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> saveHosProf(@RequestBody @Valid HosPacDto hosPacDto) {
        var hosPac = new HosPac();
        BeanUtils.copyProperties(hosPacDto, hosPac);
        return ResponseEntity.status(HttpStatus.CREATED).body(hosPacService.save(hosPac));
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/{id}")
    public ResponseEntity getOneHosPac(@PathVariable(value = "id") UUID id) {
        Optional<HosPac> hosPacOptional = hosPacService.findById(id);
        if (!hosPacOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosPac not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(hosPacOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") UUID id) {
        Optional<HosPac> hosPacOptional = hosPacService.findById(id);
        if (!hosPacOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosPac not found.");
        }
        try {
            hosPacService.delete(hosPacOptional.get());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Erro ao excluir HosPac:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir HosPac.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateHosPac(@PathVariable(value = "id") UUID id,
            @RequestBody @Valid HosPacDto hosPacDto) {
        Optional<HosPac> hosPacOptional = hosPacService.findById(id);
        if (!hosPacOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HosPac not found.");
        }
        var hosPac = new HosPac();
        BeanUtils.copyProperties(hosPacDto, hosPac);
        hosPac.setId(hosPacOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(hosPacService.save(hosPac));
    }

}
