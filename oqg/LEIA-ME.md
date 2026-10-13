# O que ganha de...? — como colocar no ar

## Arquivos
- `index.html` — o jogo (é o link que você manda para os youtubers)
- `adm.html` — seu painel (abre direto, sem senha; o jogo não tem link para ele)
- `comum.js`, `firebase-config.js` — código e configuração
- `database.rules.json` — regras de segurança do banco
- `audios/` — pasta para músicas e áudios grandes

## Testar sem internet (modo local)
O `firebase-config.js` já está com o seu projeto. Para testar só no seu navegador, sem Firebase,
troque o `apiKey` por `"COLE_AQUI"`: aí o site roda em **modo teste local**. Abra o `index.html` em
duas abas (uma para cada jogador) e o `adm.html` em outra.

## Configurar o Firebase
1. Em console.firebase.google.com, crie um projeto (ou use um que já tem).
2. **Criação > Realtime Database > Criar banco de dados** (pode começar no modo bloqueado).
3. **Criação > Authentication > Começar** e ative o método **Anônimo** (é só para o banco saber que a conexão veio do site).
4. Em **Realtime Database > Regras**, cole o conteúdo de `database.rules.json` e clique em **Publicar**.
5. O `firebase-config.js` já está preenchido com o seu projeto.
6. Em **Authentication > Configurações > Domínios autorizados**, adicione `problemsite.github.io`.

## Subir no GitHub Pages
Coloque todos os arquivos no repositório (pode ser numa pasta, ex. `o-que-ganha-de/`).
- Jogo: `https://problemsite.github.io/o-que-ganha-de/`
- Painel: `https://problemsite.github.io/o-que-ganha-de/adm.html`

O painel não pede senha. O jogo não tem nenhum link para ele, então é só não mandar o endereço do
`adm.html` para ninguém.

## Passar o que você montou no teste local para o online
No painel local: **Backup > Baixar backup**. No painel online: **Backup > Abrir arquivo de backup**.

## Áudios
- Sons curtos: envie direto pelo painel.
- Músicas e arquivos grandes: coloque na pasta `audios/` do repositório e, no painel,
  use **Usar caminho/link** com `audios/nome-do-arquivo.mp3`.
