use pedroleite12121_db;

CREATE TABLE tbUsuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

INSERT INTO tbUsuarios (nome, usuario, email, senha)
VALUES
('Carlos Silva', 'carlos.silva', 'carlos.silva@email.com', 'pbkdf2_sha256$12345$c4rlo5'),
('Bruno Ferreira', 'bferreira_dev', 'bruno.ferreira@email.com', 'bruno@access#99'),
('Ana Oliveira', 'ana_oliveira88', 'ana.oliveira@email.com', 'secure!Password2024'),
('Mariana Souza', 'mari.souza', 'mariana.souza@email.com', 'M4riana_Security'),
('Ricardo Lima', 'r.lima_admin', 'ricardo.lima@email.com', 'Admin*Pass*77');

CREATE TABLE tbTarefas (
    idTarefa INT AUTO_INCREMENT PRIMARY KEY,
    nome_da_tarefa VARCHAR(100) NOT NULL,
    tempo VARCHAR(15),
    relevancia VARCHAR(20),
    status VARCHAR(20)
);

INSERT INTO tbTarefas (nome_da_tarefa, tempo, relevancia, status)
VALUES
('Organizar e-mails','30 min','importante','em progresso'),
('Lavar a louça','15 min','pouco importante','finalizada'),
('Estudar para a prova','120 min','muito importante','atrasada'),
('Ir à academia','60 min','importante','em progresso'),
('Pagar contas do mês','20 min','muito importante','finalizada'),
('Fazer compras no mercado','90 min','importante','atrasada'),
('Limpar o escritório','45 min','pouco importante','em progresso'),
('Reunião de equipe','60 min','muito importante','finalizada'),
('Preparar marmitas','120 min','importante','em progresso'),
('Levar o cachorro para passear','30 min','pouco importante','finalizada'),
('Ler 20 páginas de um livro','40 min','importante','atrasada'),
('Meditar','10 min','pouco importante','finalizada'),
('Atualizar currículo','60 min','muito importante','em progresso'),
('Cortar o cabelo','45 min','importante','atrasada'),
('Arrumar a cama','5 min','pouco importante','finalizada'),
('Responder mensagens no WhatsApp','20 min','importante','em progresso'),
('Backup de arquivos','30 min','muito importante','atrasada'),
('Trocar as lâmpadas queimadas','15 min','pouco importante','em progresso'),
('Planejar as férias','90 min','importante','atrasada'),
('Jantar com a família','120 min','muito importante','finalizada');

CREATE TABLE tbUsuario_Tarefa (
	idUsuarioTarefa INT AUTO_INCREMENT PRIMARY KEY,
	idTarefa INT NOT NULL,
    idUsuario INT NOT NULL,
	FOREIGN KEY (idTarefa) REFERENCES tbTarefas(idTarefa),
    FOREIGN KEY (idUsuario) REFERENCES tbUsuarios(idUsuario)
);

INSERT INTO tbUsuario_Tarefa (idTarefa, idUsuario)
VALUES
(1,1),
(2,1),
(3,2),
(4,2),
(5,3),
(6,3),
(7,4),
(8,4),
(9,5),
(10,5),
(11,1),
(12,2),
(13,3),
(14,4),
(15,5),
(16,1),
(17,2),
(18,3),
(19,4),
(20,5);

CREATE TABLE tbDevs (
    idDev INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
	img VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    link_github VARCHAR(255)
);

INSERT INTO tbDevs (nome, img, funcao, link_github)
VALUES
('Pedro Leite', '/images/profile.png', 'Programador / Designer', 'https://github.com/PedroLeite12121'),
('Gustavo Cardoso', '/images/profile.png', 'Programador', 'https://github.com/GustavoCarbono'),
('Alexandre Junior', '/images/profile.png', 'Programador', 'https://github.com/Servininho'),
('Vinícius Menezes', '/images/profile.png', 'Programador', 'https://github.com/PedroLeite12121'),
('Daniel Servini', '/images/profile.png', 'Tester', 'https://github.com/Servininho');

SELECT tbTarefas.*
FROM tbUsuario_Tarefa
INNER JOIN tbTarefas
    ON tbUsuario_Tarefa.idTarefa = tbTarefas.idTarefa
WHERE tbUsuario_Tarefa.idUsuario = 1;

select * from tbUsuarios;
select * from tbTarefas;
select * from tbUsuario_Tarefa;
select * from tbDevs;