package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.LogModel;
import project.mgssepses.repository.LogRepository;

@Service
public class LogService {
    final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Transactional
    public LogModel save(LogModel log) {
        return logRepository.save(log);
    }

    public Optional<LogModel> findById(UUID idLog) {
        return logRepository.findById(idLog);
    }

    public List<LogModel> findAll() {
        return logRepository.findAll();
    }

    public void delete(LogModel log) {
        logRepository.delete(log);
    }
}
