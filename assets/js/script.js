// Seção about
const about = document.querySelector('#about')

// Seção projects
const swiperWrapper = document.querySelector('.swiper-wrapper')

// Formulário
const formulario = document.querySelector('#formulario')

//Expressão Regular de validação de Email
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


// Função de preenchimento da seção about
async function getAboutGitHub() {
	try {
		// Requisição do tipo GET para a API do GitHub
		const resposta = await fetch(
			'https://api.github.com/users/wallaceespy',
		)

		// Converter a Resposta para JSON
		const perfil = await resposta.json()

		about.innerHTML = ''

		about.innerHTML = `
      
      <!-- Imagem da Seção About -->
      <figure class="about-image">
        <img src="${perfil.avatar_url}"
             alt="${perfil.name}"
        >
      </figure>

      <!-- Conteúdo da Seção About -->
      <article class="about-content">

        <h2>Sobre mim</h2>
        <p>Olá, meu nome é Wallace tenho 31 anos, sou acadêmico em Análise e Desenvolvimento de Sistemas e atualmente estou fazendo o Bootcamp Javascript da generation . Tenho exeperiência prática no desenvolvimento de projetos como o blog pessoal e o projeto integrador (Seguro de Vida) o qual possui back-end estruturado.Também busco constantemente evoluir minhas soft skills e minha hard skill . 

 Conheça mais sobre meus projetos no meu GitHub e acompanhe minha trajetória profissional pelo meu LinkedIn.”</p>

        <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Links -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="https://drive.google.com/file/d/1UuxkJY0TAyrbK0sZi4vulPGOa19oPhpx/view?usp=drive_link" target="_blank" class="botao-outline">Currículo</a>
          </div>

          <!-- Dados - GitHub -->
          <div class="data-container">

            <!-- Nº de Seguidores -->
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <!-- Nº de Repositórios Públicos -->
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>

    `
	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

// Função buscar os dados dos projetos

async function getProjectsGitHub() {
	try {
		// Requisição do tipo GET para a API do GitHub
		const resposta = await fetch(
			'https://api.github.com/users/wallaceespy/repos?sort=updated&per_page=6',
		)

		// Converter a Resposta para JSON
		const repositorios = await resposta.json()

		swiperWrapper.innerHTML = ''

		// Cores e ícones das linguagens
		const linguagens = {
			'JavaScript': { icone: 'javascript' },
			'TypeScript': { icone: 'typescript' },
			'Python': { icone: 'python' },
			'Java': { icone: 'java' },
			'HTML': { icone: 'html' },
			'CSS': { icone: 'css' },
			'PHP': { icone: 'php' },
			'C#': { icone: 'csharp' },
			'Go': { icone: 'go' },
			'Kotlin': { icone: 'kotlin' },
			'Swift': { icone: 'swift' },
			'GitHub': { icone: 'github' },
		}

		repositorios.forEach(repositorio => {
			// Identificar a Linguagem padrão do Repositório
			const linguagem = repositorio.language || 'GitHub'

			// Selecionar o ícone da Linguagem padrão
			const config =
				linguagens[linguagem] || linguagens['GitHub']

			// Montar a URL que aponta para o ícone da Linguagem padrão
			const urlIcone = `./assets/icons/languages/${config.icone}.svg`

			// Formatar o Nome do Repositório
			const nomeFormatado = repositorio.name
				.replace(/[-_]/g, ' ') // Siubstitui hifens e underlines por espaços em branco
				.replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
				.toUpperCase() // Converte a string em letras maiúsculas

			// Descrição do Repositório
			const descricao = repositorio.description
				? repositorio.description.length > 100
					? repositorio.description.substring(0, 97) +
						'...'
					: repositorio.description
				: 'Projeto desenvolvido no GitHub'

			// Tags do Repositório
			const tags =
				repositorio.topics?.length > 0
					? repositorio.topics
							.slice(0, 3)
							.map(
								(topic) =>
									`<span class="tag">${topic}</span>`,
							)
							.join('')
					: `<span class="tag">${linguagem}</span>`

			// Botões de ação (Renderização condicional do botão deploy)
			const botoesAcao = `
          <!-- Links do Projeto -->
          <div class="project-buttons">
            <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
              GitHub
            </a>
            ${repositorio.homepage ?
              `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                Deploy
              </a>`
            : ''}
          </div>
      `

      // Construir o Card

      swiperWrapper.innerHTML += `
      
          <div class="swiper-slide">

            <article class="project-card">

              <!-- Ícone da Tecnologia padrão do projeto -->
              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone ${linguagem}"
                >
              </figure>

              <!-- Conteúdo do Projeto -->
              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <!-- Tags do Projeto -->
                <div class="project-tags">
                  ${tags}
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>
      `

		})

    iniciarSwiper();

	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

//Função iniciarSwiper()

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); //não envia, deixa fazer a validação e depois envia

    document.querySelectorAll('form span') 
    .forEach(span => span.innerHTML = '');

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3){
        erroNome.innerHTML = 'O nome deve ter o mínimo 3 caracteres'
        if (isValid) nome.focus();
        isValid = false;

    }
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    if (!email.value.trim().match(emailRegex)){
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
        if (isValid) email.focus();
        isValid = false;
        
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 3){
        erroAssunto.innerHTML = 'O Assunto deve ter o mínimo 5 caracteres'
        if (isValid) assunto.focus();
        isValid = false;

    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length  === 0){
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
        if (isValid) mensagem.focus();
        isValid = false;

    }

    if (isValid){
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }

})

// executar a função getAboutGitHub
getAboutGitHub();

// Executar a função getProjects GitHub
getProjectsGitHub();



//Animação 
const canvas = document.getElementById('plexus');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const PARTICLE_COUNT = 90;
const MAX_DIST = 160;
const MOUSE_RADIUS = 200;
let mouse = { x: W/2, y: H/2 };

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    // Aumentado de 0.5 para 2.0 para maior velocidade
    this.vx = (Math.random() - 0.5) * 2.0; 
    this.vy = (Math.random() - 0.5) * 2.0; 
    this.r = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
}

const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MAX_DIST) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(180,200,255,${(1-dist/MAX_DIST)*0.35})`;
        ctx.lineWidth = 0.6; ctx.stroke();
      }
    }
    const mdx = particles[i].x - mouse.x, mdy = particles[i].y - mouse.y;
    const md = Math.sqrt(mdx*mdx + mdy*mdy);
    if (md < MOUSE_RADIUS) {
      ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(100,160,255,${(1-md/MOUSE_RADIUS)*0.6})`;
      ctx.lineWidth = 0.8; ctx.stroke();
    }
  }
  for (const p of particles) {
    const g = Math.max(0, 1 - Math.hypot(p.x-mouse.x, p.y-mouse.y)/MOUSE_RADIUS);
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r + g*1.5, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${180+g*75},${200+g*55},255,${0.7+g*0.3})`; ctx.fill();
    p.update();
  }
  requestAnimationFrame(draw);
}
window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; particles.forEach(p => p.reset()); });
draw(); 