# Portfólio — Breno Bispo

Site estático (HTML/CSS/JS puro, sem build), em português e inglês. Basta abrir `index.html` no navegador.

## Editar
- **Dados pessoais e contatos:** `js/config.js` (campos vazios ficam ocultos; `photo` aceita `assets/img/sua-foto.jpg`).
- **Textos da página (PT e EN):** `js/i18n.js` — mesma estrutura nos dois idiomas.
- **Projetos (PT):** `js/projects.js` — `kind` = client | internal | personal | study | product; `highlight: true` coloca no topo.
- **Projetos (EN):** `js/projects.en.js` — mesma `id` do projeto em PT. Ao criar um projeto, adicione a tradução também.
- **Capturas de tela:** salve em `assets/img/` e preencha `image` no projeto.
- **Cores/tipografia:** tokens no topo de `css/style.css`.

## Idioma
Botões PT/EN no topo. Links diretos: `?lang=pt` e `?lang=en`. Sem parâmetro, usa a última escolha ou o idioma do navegador.

## Publicar (GitHub Pages)
1. Crie o repositório `portfolio` em github.com/BBispo368 e envie esta pasta.
2. Settings → Pages → Branch `main` / root.
3. O site fica em `https://bbispo368.github.io/portfolio/`.

## Trabalhar em mais de um computador
Primeira vez em um computador novo:
```bash
git clone https://github.com/BBispo368/portfolio.git
```
Ao começar a trabalhar: `git pull`
Ao terminar: `git add . && git commit -m "o que mudou" && git push`
