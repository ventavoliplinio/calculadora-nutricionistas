// ============================================
// FUNÇÃO PRINCIPAL: CALCULAR
// ============================================
function calcular() {
    // Pega valores dos campos
    const nome = document.getElementById('nome').value;
    const instagram = document.getElementById('instagram').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const seguidores = parseInt(document.getElementById('seguidores').value);
    const consultas = parseInt(document.getElementById('consultas').value);
    const valorConsulta = parseInt(document.getElementById('valor').value);
    const listaEspera = parseInt(document.getElementById('listaEspera').value);
    const jaVendeu = document.getElementById('jaVendeu').value === 'true';
    
    // Validação
    if (!nome || !instagram || !email || !whatsapp || !seguidores || !consultas || !valorConsulta || isNaN(listaEspera) || document.getElementById('jaVendeu').value === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Esconde formulário
    document.querySelector('.formulario').style.display = 'none';
    
    // Mostra loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loading').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
    
    // Animação de progresso
    animarProgresso(() => {
        // Cálculos
        const faturamentoMensal = consultas * valorConsulta;
        const faturamentoAnual = faturamentoMensal * 12;
        
        // 1% dos seguidores compram, R$ 697 cada, 3 lançamentos/ano
        const potencialAnual = Math.round(seguidores * 0.01 * 697 * 3);
        
        const perdendoAnual = potencialAnual - faturamentoAnual;
        const perdendoMensal = Math.round(perdendoAnual / 12);
        
        // Determina perfil
        const perfil = determinarPerfil(seguidores, faturamentoMensal, listaEspera, jaVendeu, valorConsulta);
        
        // Formata números
        const faturamentoMensalF = faturamentoMensal.toLocaleString('pt-BR');
        const faturamentoAnualF = faturamentoAnual.toLocaleString('pt-BR');
        const potencialAnualF = potencialAnual.toLocaleString('pt-BR');
        const perdendoAnualF = perdendoAnual.toLocaleString('pt-BR');
        const perdendoMensalF = perdendoMensal.toLocaleString('pt-BR');
        const seguidoresF = seguidores.toLocaleString('pt-BR');
        
        // Esconde loading
        document.getElementById('loading').style.display = 'none';
        
        // Monta resultado personalizado
        const resultadoHTML = montarResultado(
            nome, 
            perfil, 
            seguidores, 
            seguidoresF,
            consultas, 
            faturamentoMensal,
            faturamentoMensalF,
            faturamentoAnual,
            faturamentoAnualF, 
            potencialAnual,
            potencialAnualF, 
            perdendoAnual,
            perdendoAnualF, 
            perdendoMensal,
            perdendoMensalF,
            listaEspera,
            jaVendeu
        );
        
        // Mostra resultado
        document.getElementById('resultado-conteudo').innerHTML = resultadoHTML;
        document.getElementById('resultado').style.display = 'block';
        
        // Scroll suave até resultado
        setTimeout(() => {
            document.getElementById('resultado').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
        
        // Facebook Pixel - Track CustomEvent
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Calculadora Preenchida',
                value: perdendoAnual,
                currency: 'BRL',
                perfil: perfil.perfil,
                email: email,
                phone: whatsapp
            });
        }
    });
}

// ============================================
// ANIMAÇÃO DE PROGRESSO
// ============================================
function animarProgresso(callback) {
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.getElementById('loadingText');
    
    const mensagens = [
        'Analisando seus seguidores...',
        'Calculando faturamento atual...',
        'Estimando potencial de mercado...',
        'Comparando com concorrentes...',
        'Finalizando análise...'
    ];
    
    let progresso = 0;
    let mensagemIndex = 0;
    
    const intervalo = setInterval(() => {
        progresso += 20;
        progressFill.style.width = progresso + '%';
        
        if (mensagemIndex < mensagens.length) {
            loadingText.textContent = mensagens[mensagemIndex];
            mensagemIndex++;
        }
        
        if (progresso >= 100) {
            clearInterval(intervalo);
            loadingText.textContent = '✅ ANÁLISE COMPLETA!';
            setTimeout(callback, 500);
        }
    }, 600);
}

// ============================================
// DETERMINAR PERFIL
// ============================================
function determinarPerfil(seguidores, faturamentoMensal, temListaEspera, jaVendeu, valorConsulta) {
    
    // PERFIL 4: Emperrada de Sucesso
    if (seguidores >= 30000 && faturamentoMensal >= 40000 && temListaEspera >= 4 && valorConsulta >= 500) {
        return {
            perfil: "A EMPERRADA DE SUCESSO",
            emoji: "🚀",
            cor: "#9D4EDD",
            prioridade: "ALTA",
            cta: "QUERO ESCALAR PRO PRÓXIMO NÍVEL",
            badge: "badge-roxo.webp"
        };
    }
    
    // PERFIL 1: Invisível Milionária
    if (seguidores >= 25000 && faturamentoMensal >= 20000 && temListaEspera >= 2 && valorConsulta >= 400) {
        return {
            perfil: "A INVISÍVEL MILIONÁRIA",
            emoji: "🔥",
            cor: "#E63946",
            prioridade: "ALTA",
            cta: "QUERO PARAR DE PERDER ISSO AGORA",
            badge: "badge-vermelho.webp"
        };
    }
    
    // PERFIL 2: Queimada Resiliente
    if (jaVendeu === true && faturamentoMensal >= 15000) {
        return {
            perfil: "A QUEIMADA RESILIENTE",
            emoji: "💪",
            cor: "#FF6B6B",
            prioridade: "MÉDIA",
            cta: "QUERO FAZER CERTO DESSA VEZ",
            badge: "badge-laranja.webp"
        };
    }
    
    // PERFIL 3: Promessa Adormecida
    if (seguidores >= 10000 && seguidores < 25000 && faturamentoMensal >= 10000 && faturamentoMensal < 25000) {
        return {
            perfil: "A PROMESSA ADORMECIDA",
            emoji: "🌱",
            cor: "#06FFA5",
            prioridade: "MÉDIA",
            cta: "QUERO MULTIPLICAR MEU IMPACTO",
            badge: "badge-verde.webp"
        };
    }
    
    // PERFIL 5: Iniciante Corajosa
    return {
        perfil: "A INICIANTE CORAJOSA",
        emoji: "💚",
        cor: "#4CAF50",
        prioridade: "BAIXA",
        cta: "QUERO COMEÇAR DO JEITO CERTO",
        badge: "badge-verde-claro.webp"
    };
}

// ============================================
// MONTAR RESULTADO PERSONALIZADO
// ============================================
function montarResultado(nome, perfil, seguidores, seguidoresF, consultas, faturamentoMensal, faturamentoMensalF, faturamentoAnual, faturamentoAnualF, potencialAnual, potencialAnualF, perdendoAnual, perdendoAnualF, perdendoMensal, perdendoMensalF, listaEspera, jaVendeu) {
    
    let html = '';
    
    // Header do perfil
    html += `
        <div class="perfil-header" style="border-left: 4px solid ${perfil.cor};">
            <h2 style="color: ${perfil.cor};">
                ${perfil.emoji} SEU PERFIL: ${perfil.perfil}
            </h2>
            <p class="perfil-prioridade">Prioridade: <strong>${perfil.prioridade}</strong></p>
        </div>
    `;
    
    // Saudação personalizada
    html += `<p class="saudacao">${nome}, você é o que eu chamo de "${perfil.perfil}".</p>`;
    
    // Números do perfil
    html += `
        <div class="numeros-perfil">
            <h3>📊 Seus números:</h3>
            <ul>
                <li>${seguidoresF} pessoas te seguindo</li>
                <li>R$ ${faturamentoMensalF}/mês no consultório</li>
                <li>${consultas} consultas/mês</li>
    `;
    
    if (listaEspera > 0) {
        const semanas = listaEspera === 1 ? '1-2 semanas' : 
                       listaEspera === 3 ? '2-4 semanas' : 
                       'mais de 4 semanas';
        html += `<li>Lista de espera de ${semanas}</li>`;
    } else {
        html += `<li>Sem lista de espera</li>`;
    }
    
    html += `</ul></div>`;
    
    // Diagnóstico específico por perfil
    html += gerarDiagnostico(perfil, seguidores, seguidoresF, consultas, faturamentoMensal, listaEspera, jaVendeu);
    
    // Números financeiros
    html += `
        <div class="financeiro">
            <h3>💰 O que você está perdendo:</h3>
            <p>Faturamento atual: <strong>R$ ${faturamentoAnualF}/ano</strong></p>
            <p class="destaque">Faturamento potencial: <strong>R$ ${potencialAnualF}/ano</strong></p>
            <p class="alerta">DIFERENÇA: <strong>R$ ${perdendoAnualF}/ano</strong></p>
            <p class="alerta-mensal">Ou seja: <strong>R$ ${perdendoMensalF}/mês</strong> indo pros seus concorrentes.</p>
        </div>
    `;
    
    // Explicação do por quê
    html += gerarExplicacao(perfil, seguidores, consultas, listaEspera, jaVendeu);
    
    // Solução
    html += `
        <div class="solucao">
            <h3>✅ O QUE FAZER:</h3>
            ${gerarSolucao(perfil, seguidores, faturamentoMensal)}
        </div>
    `;
    
    // Próximo passo
    html += `
        <div class="proximo-passo">
            <h3>💡 PRÓXIMO PASSO:</h3>
            <p>Me chama no WhatsApp.</p>
            <p>Vou te mostrar o <strong>Método Mãe Autoridade™</strong>.</p>
            ${gerarProximoPassoPersonalizado(perfil, faturamentoMensal)}
        </div>
    `;
    
    // CTA final
    html += `
        <a href="https://wa.me/5535997140204?text=Oi%20Plínio,%20acabei%20de%20fazer%20a%20calculadora%20e%20descobri%20meu%20perfil:%20${encodeURIComponent(perfil.perfil)}%20-%20Quero%20parar%20de%20perder%20R$%20${perdendoMensalF}%20por%20mês!" class="btn-cta" target="_blank" style="background: ${perfil.cor};">
            ${perfil.cta}
        </a>
    `;
    
    return html;
}

// ============================================
// GERAR DIAGNÓSTICO POR PERFIL
// ============================================
function gerarDiagnostico(perfil, seguidores, seguidoresF, consultas, faturamentoMensal, listaEspera, jaVendeu) {
    let html = '<div class="diagnostico"><h3>🎯 Seu problema:</h3>';
    
    switch(perfil.perfil) {
        case "A INVISÍVEL MILIONÁRIA":
            html += `
                <p>Você TEM o conhecimento.</p>
                <p>Você TEM a audiência.</p>
                <p>Você TEM a demanda.</p>
                <p><strong>Mas você está INVISÍVEL pra 99,7% das suas seguidoras.</strong></p>
            `;
            break;
            
        case "A QUEIMADA RESILIENTE":
            html += `
                <p>Você já TENTOU.</p>
                <p>Criou ebook. Postou "link na bio".</p>
                <p>Vendeu 15... 20 unidades.</p>
                <p>E pensou: "Não funciona pra mim."</p>
                <p><strong>Mas deixa eu te contar uma coisa: Não foi culpa sua.</strong></p>
                <p>Não é porque "sua audiência não compra".</p>
                <p><strong>É porque você cometeu os 3 erros fatais:</strong></p>
                <ol>
                    <li>Produto genérico (igual de outras 50 nutricionistas)</li>
                    <li>Funil inexistente (só "link na bio")</li>
                    <li>Tráfego errado (ou zero tráfego pago)</li>
                </ol>
            `;
            break;
            
        case "A PROMESSA ADORMECIDA":
            html += `
                <p>Você TEM o conhecimento.</p>
                <p>Você TEM seguidoras.</p>
                <p><strong>Mas você ainda não DECOLOU.</strong></p>
                <p>Por quê?</p>
                <p>Porque você está presa no modelo "tempo por dinheiro":</p>
                <ul>
                    <li>Atende ${consultas} mães/mês</li>
                    <li>Ganha R$ ${faturamentoMensal.toLocaleString('pt-BR')}/mês</li>
                    <li>Trabalha 160 horas/mês</li>
                </ul>
                <p>Ou seja: <strong>R$ ${Math.round(faturamentoMensal / 160)}/hora.</strong></p>
                <p><strong>Mas seu conhecimento VALE MUITO MAIS.</strong></p>
            `;
            break;
            
        case "A EMPERRADA DE SUCESSO":
            html += `
                <p>Você JÁ É BEM-SUCEDIDA.</p>
                <p><strong>Mas você chegou no TETO.</strong></p>
                <p>Você não consegue atender mais gente.</p>
                <p>Não consegue cobrar mais.</p>
                <p>Não consegue trabalhar mais horas.</p>
                <p><strong>Você está EMPERRADA.</strong></p>
                <p>E o pior: Você está RECUSANDO R$ 100-150k/ano.</p>
            `;
            break;
            
        case "A INICIANTE CORAJOSA":
            html += `
                <p>Você está COMEÇANDO.</p>
                <p><strong>E isso é ÓTIMO.</strong></p>
                <p>Por quê?</p>
                <p>Porque você ainda NÃO criou os vícios ruins:</p>
                <ul>
                    <li>Trabalhar 200h/mês</li>
                    <li>Cobrar barato</li>
                    <li>Não ter tempo pra nada</li>
                </ul>
                <p><strong>Você pode criar SEU NEGÓCIO do jeito certo desde o início.</strong></p>
            `;
            break;
    }
    
    html += '</div>';
    return html;
}

// ============================================
// GERAR EXPLICAÇÃO DO POR QUÊ
// ============================================
function gerarExplicacao(perfil, seguidores, consultas, listaEspera, jaVendeu) {
    let html = '<div class="explicacao"><h3>🚨 POR QUÊ você está perdendo isso:</h3>';
    
    if (perfil.perfil === "A INVISÍVEL MILIONÁRIA" || perfil.perfil === "A EMPERRADA DE SUCESSO") {
        const interessadas = Math.round(seguidores * 0.01);
        const naoAtende = interessadas - consultas;
        
        html += `
            <p>Você atende ${consultas} mães/mês.</p>
            <p>Mas <strong>${interessadas} pessoas te PERGUNTAM</strong> sobre consulta todo mês.</p>
            <p>As ${naoAtende} que você não atende?</p>
            <p><strong>Vão comprar de OUTRA nutricionista.</strong></p>
            <p>Não porque a outra é melhor.</p>
            <p><strong>Mas porque a outra TEM um produto que vende enquanto ela dorme.</strong></p>
        `;
    } else if (jaVendeu) {
        html += `
            <p>Se você tivesse feito do JEITO CERTO:</p>
            <ul>
                <li>1% da sua audiência = ${Math.round(seguidores * 0.01)} vendas</li>
                <li>R$ 697 cada = R$ ${Math.round(seguidores * 0.01 * 697).toLocaleString('pt-BR')}/lançamento</li>
                <li>Você vendeu: R$ 10.000 (ebook de R$ 97)</li>
            </ul>
            <p><strong>A diferença ficou na mesa.</strong></p>
        `;
    } else {
        html += `
            <p>Enquanto você não tem produto digital,</p>
            <p><strong>Suas seguidoras estão comprando da concorrente.</strong></p>
            <p>Não porque ela é melhor que você.</p>
            <p>Mas porque ela DOCUMENTOU o método dela.</p>
        `;
    }
    
    html += '</div>';
    return html;
}

// ============================================
// GERAR SOLUÇÃO
// ============================================
function gerarSolucao(perfil, seguidores, faturamentoMensal) {
    let html = '';
    
    if (perfil.perfil === "A QUEIMADA RESILIENTE") {
        html += `
            <p>Método Mãe Autoridade™ resolve os 3 erros:</p>
            <ul>
                <li><strong>Erro #1</strong> → Método proprietário (não ebook genérico)</li>
                <li><strong>Erro #2</strong> → Funil Materno™ (não só "link na bio")</li>
                <li><strong>Erro #3</strong> → Tráfego profissional (não orgânico só)</li>
            </ul>
            <p><strong>Resultado: 100-150 vendas no relançamento.</strong></p>
        `;
    } else if (perfil.perfil === "A EMPERRADA DE SUCESSO") {
        html += `
            <p>Você não precisa trabalhar mais.</p>
            <p><strong>Você precisa MULTIPLICAR.</strong></p>
            <p><strong>AGORA:</strong> 1 hora = 1 consulta = R$ ${Math.round(faturamentoMensal / consultas)}</p>
            <p><strong>COM PRODUTO:</strong> 1 hora gravando = 1.000 mães atendidas = R$ 697.000</p>
        `;
    } else if (perfil.perfil === "A PROMESSA ADORMECIDA") {
        html += `
            <p>Você precisa MULTIPLICAR seu impacto:</p>
            <p><strong>AGORA:</strong></p>
            <ul>
                <li>1 mãe por vez</li>
                <li>R$ ${Math.round(faturamentoMensal / consultas)} por consulta</li>
                <li>${consultas} mães/mês = limite</li>
            </ul>
            <p><strong>COM PRODUTO DIGITAL:</strong></p>
            <ul>
                <li>150 mães ao mesmo tempo</li>
                <li>R$ 697 cada</li>
                <li>Escala infinita</li>
            </ul>
        `;
    } else {
        html += `
            <p>Você precisa de um <strong>PRODUTO DIGITAL</strong> que:</p>
            <ol>
                <li>Atende quem você não consegue atender</li>
                <li>Gera R$ 20-40k/mês adicional</li>
                <li>Funciona no automático (você não trabalha mais)</li>
            </ol>
        `;
    }
    
    return html;
}

// ============================================
// GERAR PRÓXIMO PASSO PERSONALIZADO
// ============================================
function gerarProximoPassoPersonalizado(perfil, faturamentoMensal) {
    let html = '';
    
    switch(perfil.perfil) {
        case "A INVISÍVEL MILIONÁRIA":
            html += `
                <p>É EXATAMENTE pra perfis como você:</p>
                <ul>
                    <li>Já tem audiência consolidada</li>
                    <li>Já tem autoridade</li>
                    <li>Só precisa DOCUMENTAR o método</li>
                </ul>
                <p><strong>Meta:</strong> 90 dias pra lançar</p>
                <p><strong>Resultado esperado:</strong> R$ 50-100k no primeiro lançamento</p>
            `;
            break;
            
        case "A QUEIMADA RESILIENTE":
            html += `
                <p>Vou te mostrar EXATAMENTE onde você errou</p>
                <p>(e como fazer certo dessa vez).</p>
                <p><strong>Você já provou que tem CORAGEM.</strong></p>
                <p>Agora só precisa do MÉTODO certo.</p>
            `;
            break;
            
        case "A PROMESSA ADORMECIDA":
            html += `
                <p>Vou te mostrar como acordar essa promessa.</p>
                <p><strong>Meta:</strong> Adicionar R$ 10-20k/mês em 90 dias</p>
                <p>(SEM trabalhar mais horas)</p>
            `;
            break;
            
        case "A EMPERRADA DE SUCESSO":
            html += `
                <p>Você não precisa do "básico".</p>
                <p><strong>Você precisa de ESCALA PROFISSIONAL.</strong></p>
                <p>Vou te mostrar como ir de R$ ${Math.round(faturamentoMensal / 1000)}k/mês → R$ 100k+/mês</p>
                <p>sem atender mais ninguém.</p>
            `;
            break;
            
        case "A INICIANTE CORAJOSA":
            html += `
                <p>Você ainda não tem capital gigante pra investir?</p>
                <p><strong>Sem problema.</strong></p>
                <p>Eu cobro menos pra perfis iniciantes</p>
                <p>(porque você ainda tá construindo reserva).</p>
                <p><strong>Vou te mostrar como começar CERTO.</strong></p>
            `;
            break;
    }
    
    return html;
}
