# MGS Sepses

Sistema web para monitoramento e prevenção de sepse em ambiente hospitalar, desenvolvido para a disciplina de Engenharia de Software II.

## Descrição

O MGS Sepses tem como objetivo identificar precocemente pacientes com risco de sepse. Ele coleta dados clínicos, calcula o risco usando o escore SOFA e gera alertas para a equipe médica.  

## Tecnologias

- Angular 18  
- Spring Boot 3.4.2  
- PostgreSQL 15.6  
- Bootstrap 5.3  
- TypeScript 5.7.2  
- Node.js 20.18.0  

## Situação 

Em andamento.

## Como Executar

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

## Funcionalidades

- Login com CPF 
- Cadastro de pacientes  
- Registro de exames e situações adversas  
- Geração de alertas automáticos  
- Relatórios de sepse  
- Recuperação de senha
- Administração de usuário, por meio de um usuário administrador do sistema
- Administração dos hospitais
- Geração de logs

## Equipe

- Mariana de Jesus Silva
