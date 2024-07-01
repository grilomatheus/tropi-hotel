# Tropi-Hotel

## Sobre o Projeto

Tropi-Hotel é uma aplicação desenvolvida como parte de um teste prático de desenvolvimento Front-End utilizando Vue.js. A aplicação simula um sistema de reserva de hotéis, permitindo ao usuário pesquisar, comparar e reservar hotéis.

## Funcionalidades

- **Pesquisa de Hotéis**: Os usuários podem inserir critérios de pesquisa como destino, datas de check-in e check-out, número de quartos e número de hóspedes.
- **Comparação de Hotéis**: É possível selecionar múltiplos hotéis dos resultados de busca para comparar suas características lado a lado.
- **Reserva de Quartos**: Os usuários podem reservar quartos, fornecendo informações pessoais e detalhes de pagamento.
- **Notificações**: A aplicação notifica os usuários sobre o status de suas reservas.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework progressivo para construir interfaces de usuário.
- **Pinia**: Usado para gerenciamento de estado.
- **Vue Router**: Utilizado para a navegação na aplicação.
- **Vuetify**: Framework de UI para Vue.js que implementa Material Design.

## Configuração do Projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar e minificar para produção
npm run build

# Executar testes unitários
npm run test
```

## Estrutura do Projeto

- **src**: Pasta contendo todos os componentes Vue, plugins, serviços, rotas e armazenamentos (stores).
- **public**: Pasta contendo recursos estáticos como ícones e imagens.
- **tests**: Pasta contendo os testes dos componentes.

## Testes

Os testes foram implementados utilizando Vitest e Vue Test Utils. Os componentes são testados para garantir que eles funcionem conforme esperado.

## CI/CD

O projeto utiliza GitHub Actions para CI/CD, automatizando testes e deployment a cada push no repositório.

## Contribuições

Contribuições são bem-vindas. Para contribuir, por favor, abra um pull request com suas alterações.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

## Autor

- **Matheus Grilo** - Desenvolvedor do projeto
