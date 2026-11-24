# Portfólio — Breno Bispo

Site estático (HTML/CSS/JS puro, sem build), em português e inglês. Basta abrir `index.html` no navegador.

## Editar
- **Dados pessoais e contatos:** `js/config.js` (campos vazios ficam ocultos; `photo` aceita `assets/img/sua-foto.jpg`).
- **Currículo, trajetória e depoimentos:** `cv`, `timeline` e `testimonials` em `js/config.js`, com exemplos nos comentários. Só aparecem quando preenchidos.
- **Estudo de caso:** `caseStudy` no projeto em `js/projects.js`, com a tradução em `js/projects.en.js`.
- **Textos da página (PT e EN):** `js/i18n.js` — mesma estrutura nos dois idiomas.
- **Projetos (PT):** `js/projects.js` — `kind` = client | internal | personal | study | product; `highlight: true` coloca no topo.
- **Projetos (EN):** `js/projects.en.js` — mesma `id` do projeto em PT. Ao criar um projeto, adicione a tradução também.
- **Ferramentas com ícone:** `js/tools.js` — `name` igual ao usado em `stack` dos projetos; `group` = web | data | mobile | auto. Ícones do [Simple Icons](https://simpleicons.org) (CC0); as demais ferramentas aparecem em texto.
- **Capturas de tela:** salve em `assets/img/` e preencha `image` no projeto.
- **Cores/tipografia:** tokens no topo de `css/style.css`.

## Currículo (LaTeX)
Fontes em `cv/`: `breno-bispo-pt.tex`, `breno-bispo-en.tex` e o estilo compartilhado `estilo.tex`. Trechos com `\preencher{...}` aparecem destacados em laranja no PDF e precisam ser trocados antes de publicar.

Para gerar os PDFs com pdfLaTeX (MiKTeX ou TeX Live):
```bash
cd cv
pdflatex -output-directory=../assets/cv breno-bispo-pt.tex
pdflatex -output-directory=../assets/cv breno-bispo-en.tex
```
Sem LaTeX instalado, envie os três arquivos ao Overleaf e compile com pdfLaTeX. Depois, preencha `cv` em `js/config.js` com `assets/cv/breno-bispo-pt.pdf` e `assets/cv/breno-bispo-en.pdf` para o botão aparecer no site.

## Idioma
Botões PT/EN no topo. Links diretos: `?lang=pt` e `?lang=en`. Sem parâmetro, usa a última escolha ou o idioma do navegador.

## Link direto para um projeto
`?projeto=id` abre o projeto, por exemplo `?projeto=crm-vendas&lang=en`.

## Publicar (GitHub Pages)
1. Crie o repositório `portfolio` em github.com/BBispo368 e envie esta pasta.
2. Settings → Pages → Branch `main` / root.
3. O site fica em `https://bbispo368.github.io/portfolio/`.

Ao trocar para um domínio próprio, atualize o endereço em `index.html`, `sitemap.xml` e `robots.txt`. Até lá, envie o `sitemap.xml` pelo Google Search Console: buscadores só leem `robots.txt` na raiz do domínio, então o arquivo em `/portfolio/` não tem efeito.

## Trabalhar em mais de um computador
Primeira vez em um computador novo:
```bash
git clone https://github.com/BBispo368/portfolio.git
```
Ao começar a trabalhar: `git pull`
Ao terminar: `git add . && git commit -m "o que mudou" && git push`
