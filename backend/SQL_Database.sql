CREATE SCHEMA `sact2021` ;
USE sact2021;

CREATE TABLE `sact2021`.`admin` (
  `chave` VARCHAR(20) NOT NULL,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`chave`));


CREATE TABLE `sact2021`.`chaves` (
  `id` INT NOT NULL,
  `chave_avaliador` VARCHAR(32) NULL,
  `chave_professor` VARCHAR(32) NULL,
  `chave_projeto` VARCHAR(32) NULL,
  PRIMARY KEY (`id`));
  
  INSERT INTO `sact2021`.`chaves` (`id`, `chave_avaliador`, `chave_professor`, `chave_projeto`) VALUES ('1', '10000', '10000', '10000');

CREATE TABLE `sact2021`.`avaliador` (
  `chave` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `instituicao` VARCHAR(50) NULL,
  `projetos_avaliados` INT NULL,
  PRIMARY KEY (`chave`));


CREATE TABLE `sact2021`.`projetos` (
  `chave` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `turma` VARCHAR(10) NULL,
  `curso` VARCHAR(45) NULL,
  `descricao` TEXT(1000) NULL,
  `aluno1` VARCHAR(50) NULL,
  `aluno2` VARCHAR(50) NULL,
  `aluno3` VARCHAR(50) NULL,
  `aluno4` VARCHAR(50) NULL,
  `professor` VARCHAR(50) NULL,
  `nota_professor` FLOAT NULL,
  `nota_avaliador` FLOAT NULL,
  `qtd_avaliacoes` INT NULL,
  PRIMARY KEY (`chave`));

