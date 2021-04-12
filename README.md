# Recuperação de senha
**RF**
[x] O usuário deve poder recuperar sua senha informando seu e-mail;
[x] O usuário deve receber um e-mail com as instruções para recuperar sua senha;
[] O usuário deve redefinir sua senha;

**RNF**
[] Utilizar Mailtrap para testar envios de e-mails em ambiente de desenvolvimento;
[] Utilizar Amazon SES para envios em produção;
[] O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
[] O link enviado por e-mail para recuperação da senha deve expirar em 2h;
[] O usuário precisar confirmar a nova senha ao redefini-la;

# Atualização do perfil
**RF**
[x] O usuário deve poder atualizar seu nome, e-mail e senha;

**RNF**
[none]

**RN**
[x] O usuário não pode alterar seu e-mail para um e-mail já utlizado;
[x] Para atualizar sua senha, o usuário deve informar a antiga;
[x] Para atualizar a senha, o usuário precisa confirmar a nova;

# Painel do prestador
**RF**
[] O usuário deve poder listar seus agendamentos de um dia específico;
[] O prestador deve receber uma notificação sempre que houver um novo agendamento;
[] O prestador deve poder visualizar as notificações não-lidas;

**RNF**
[] Os agendamentos do dia do prestador devem ser armazenados em cache;
[] As notificações do prestador devem ser armazenadas em MongoDB;
[] As notificações do prestador devem ser enviadas em tempo-real, utilizando Socket.io;

**RN**
[] A notificação deve ter um status de 'lida' ou 'não-lida', para controle do prestador;

# Agendamento de serviços
**RF**
[x] O usuário deve poder listar todos os prestadores de serviços cadastrados;
[x] O usuário deve poder listar os dias do mês do prestador selecionado com, pelo menos, um horário disponível;
[x] O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
[x] O usuário deve poder realizar um novo agendamento com o prestador selecionado;

**RNF**
[] A listagem de prestadores deve ser armazenada em cache;

**RN**
[x] Cada agendamento deve durar 1h;
[x] Os agendamentos devem estar disponíveis entre 08h e 18h;
[x] O usuário não pode agendar em um horário já ocupado;
[x] O usuário não pode agendar em um horário que já passou;
[x] O usuário não pode agendar serviços consigo mesmo;
