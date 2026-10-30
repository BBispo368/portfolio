// Textos da página em português e inglês. A mesma chave existe nos dois idiomas.
// {n} = número de projetos.
window.I18N = {
  pt: {
    meta: {
      title: "Breno Bispo · Portfólio",
      description: "Sistemas web, apps Android e automações sob medida para empresas e clientes.",
    },
    nav: { work: "Projetos", process: "Como trabalho", about: "Sobre", contact: "Contato", theme: "Alternar tema claro/escuro", lang: "Idioma", skip: "Ir para os projetos" },
    hero: {
      role: "Desenvolvedor full stack e de automação",
      statement: "Crio sistemas, apps e automações que tiram empresas da planilha e do papel.",
      status: "Disponível para projetos e vagas",
      ctaContact: "Falar comigo",
      ctaWork: "Ver projetos",
    },
    work: {
      title: "Projetos",
      intro: "{n} projetos entre sistemas internos, sites, apps e automações. Clique em um para ver os detalhes.",
      all: "Todos",
      featured: "Destaque",
      features: "O que faz",
      stack: "Feito com",
      demo: "Ver site no ar",
      repo: "Ver código no GitHub",
      close: "Fechar",
      shotAlt: "Tela {n} do projeto {title}",
      shotNote: "Telas reais do sistema, com dados fictícios.",
      shotNoteRecreated: "Telas recriadas a partir do código do app, com dados fictícios.",
      note: "Projetos de empresas e clientes aparecem sem nomes, dados ou código proprietário.",
      kinds: { client: "Cliente", internal: "Uso interno", personal: "Pessoal", study: "Estudo", product: "Produto" },
    },
    process: {
      title: "Como trabalho",
      steps: [
        { name: "Entender", text: "Converso com quem usa o processo hoje para mapear a rotina, os gargalos e o que a primeira entrega precisa resolver." },
        { name: "Planejar", text: "Defino escopo, telas e a tecnologia mais simples que resolve. Você sabe o que vai receber e quando." },
        { name: "Construir", text: "Entregas curtas, testadas com quem vai usar, ajustando ao longo do caminho." },
        { name: "Acompanhar", text: "Publico, treino a equipe e acompanho o uso para corrigir e evoluir." },
      ],
    },
    stack: { title: "Ferramentas", intro: "As que mais uso, com o número de projetos em que aparecem.", more: "e mais {n} usadas em projetos pontuais" },
    about: {
      title: "Sobre",
      text: [
        "Sou desenvolvedor full stack e trabalho de ponta a ponta: levanto o problema com quem usa, desenho a solução, desenvolvo, publico e dou suporte.",
        "A maior parte do que construí roda numa operação industrial de verdade: ordens de serviço, compras, fluxo de caixa, painéis de TV na oficina e checklists de veículos. Também faço sites para clientes, apps Android offline e automações em Python e AutoHotkey.",
      ],
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        { q: "Você desenvolve sistemas sob medida?", a: "Sim. A maior parte dos meus projetos são sistemas para rotinas específicas de empresas: ordens de serviço, compras, fluxo de caixa, inventário e atendimento." },
        { q: "Faz aplicativos Android?", a: "Sim, apps nativos em Kotlin com Jetpack Compose, inclusive soluções 100% offline com câmera e reconhecimento facial." },
        { q: "Dá para integrar com o sistema que já uso?", a: "Na maioria dos casos, sim: leitura de relatórios do ERP em PDF ou Excel, robôs de coleta, APIs e integração com WhatsApp." },
        { q: "E depois da entrega?", a: "Acompanho o uso, corrijo problemas e evoluo o sistema conforme a operação muda." },
        { q: "Como peço um orçamento?", a: "Mande uma mensagem contando o problema que quer resolver. Respondo com perguntas e uma proposta inicial." },
      ],
    },
    contact: {
      title: "Tem um processo travando sua equipe?",
      text: "Me conte o problema. Respondo com perguntas e uma proposta inicial. Também estou aberto a vagas como desenvolvedor.",
      email: "Enviar e-mail",
      whatsapp: "Chamar no WhatsApp",
      mailSubject: "Novo projeto",
    },
    footer: { top: "Voltar ao topo" },
  },

  en: {
    meta: {
      title: "Breno Bispo · Portfolio",
      description: "Custom web systems, Android apps and automations for companies and clients.",
    },
    nav: { work: "Work", process: "How I work", about: "About", contact: "Contact", theme: "Toggle light/dark theme", lang: "Language", skip: "Skip to projects" },
    hero: {
      role: "Full stack and automation developer",
      statement: "I build systems, apps and automations that move companies off spreadsheets and paper.",
      status: "Available for projects and roles",
      ctaContact: "Get in touch",
      ctaWork: "See projects",
    },
    work: {
      title: "Work",
      intro: "{n} projects across business systems, websites, apps and automations. Click one to see the details.",
      all: "All",
      featured: "Featured",
      features: "What it does",
      stack: "Built with",
      demo: "Visit live site",
      repo: "View code on GitHub",
      close: "Close",
      shotAlt: "Screen {n} of {title}",
      shotNote: "Real screens from the system, shown with sample data.",
      shotNoteRecreated: "Screens recreated from the app's source code, shown with sample data.",
      note: "Company and client projects are shown without names, data or proprietary code.",
      kinds: { client: "Client", internal: "In-house", personal: "Personal", study: "Study", product: "Product" },
    },
    process: {
      title: "How I work",
      steps: [
        { name: "Understand", text: "I talk to the people who run the process today to map the routine, the bottlenecks and what the first delivery must solve." },
        { name: "Plan", text: "I define scope, screens and the simplest technology that does the job. You know what you'll get and when." },
        { name: "Build", text: "Short deliveries, tested with real users, adjusted along the way." },
        { name: "Support", text: "I ship it, train the team and follow up to fix and improve." },
      ],
    },
    stack: { title: "Tools", intro: "The ones I use most, with the number of projects they appear in.", more: "plus {n} more used in single projects" },
    about: {
      title: "About",
      text: [
        "I'm a full stack developer who works end to end: I map the problem with the people who live it, design the solution, build it, ship it and support it.",
        "Most of what I've built runs in a real industrial operation: work orders, purchasing, cash flow, shop-floor TV boards and vehicle checklists. I also build websites for clients, offline Android apps and automations in Python and AutoHotkey.",
      ],
    },
    faq: {
      title: "Questions",
      items: [
        { q: "Do you build custom systems?", a: "Yes. Most of my projects are systems for a company's specific routines: work orders, purchasing, cash flow, inventory and customer service." },
        { q: "Do you build Android apps?", a: "Yes, native apps in Kotlin with Jetpack Compose, including fully offline solutions with camera and face recognition." },
        { q: "Can it connect to the system I already use?", a: "Usually, yes: reading ERP reports in PDF or Excel, data-collection bots, APIs and WhatsApp integration." },
        { q: "What happens after delivery?", a: "I follow up on usage, fix issues and evolve the system as your operation changes." },
        { q: "How do I get a quote?", a: "Send a message describing the problem you want to solve. I'll reply with questions and an initial proposal." },
      ],
    },
    contact: {
      title: "Is a process holding your team back?",
      text: "Tell me about the problem. I'll reply with questions and an initial proposal. I'm also open to developer roles.",
      email: "Send an email",
      whatsapp: "Message on WhatsApp",
      mailSubject: "New project",
    },
    footer: { top: "Back to top" },
  },
};
