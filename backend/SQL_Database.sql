CREATE SCHEMA `sact2021` ;

USE sact2021;

CREATE TABLE IF NOT EXISTS `sact2021`.`admin` (
  `chave` VARCHAR(20) NOT NULL,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`chave`));


CREATE TABLE IF NOT EXISTS `sact2021`.`chaves` (
  `id` INT NOT NULL,
  `chave_avaliador` VARCHAR(32) NULL,
  `chave_professor` VARCHAR(32) NULL,
  `chave_projeto` VARCHAR(32) NULL,
  PRIMARY KEY (`id`));
  
  INSERT INTO `sact2021`.`chaves` (`id`, `chave_avaliador`, `chave_professor`, `chave_projeto`) VALUES ('1', '10000', '10000', '10000');

CREATE TABLE IF NOT EXISTS `sact2021`.`avaliador` (
  `chave` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `instituicao` VARCHAR(50) NULL,
  `projetos_avaliados` INT NULL,
  PRIMARY KEY (`chave`));


CREATE TABLE IF NOT EXISTS `sact2021`.`projetos` (
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
  `nota_acumulada` FLOAT NULL,
  PRIMARY KEY (`chave`));

CREATE TABLE IF NOT EXISTS `sact2021`.`professor` (
  `chave` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `curso` VARCHAR(45) NULL,
  `qtd_projetos` INT NULL,
  `qtd_avaliacoes` INT NULL,
  PRIMARY KEY (`chave`));

CREATE TABLE IF NOT EXISTS `sact2021`.`criterios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `criterio` TEXT(1000) NULL,
  `peso` FLOAT NULL,
  `curso` VARCHAR(20) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `sact2021`.`avaliacoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chave_projeto` INT NULL,
  `chave_avaliador` INT NULL,
  `nome_projeto` VARCHAR(100) NULL,
  `nome_avaliador` VARCHAR(100) NULL,
  `tipo_avaliador` VARCHAR(20) NULL,
  `nota` FLOAT NULL,
  `hora_avaliacao` VARCHAR(50) NULL,
  `curso` VARCHAR(20) NULL,
  `turma` VARCHAR(5),
  PRIMARY KEY (`id`));