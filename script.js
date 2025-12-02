function calcular() {
    // Pega valores dos campos
    const nome = document.getElementById('nome').value;
    const instagram = document.getElementById('instagram').value;
    const seguidores = parseInt(document.getElementById('seguidores').value);
    const consultas = parseInt(document.getElementById('consultas').value);
    const valorConsulta = parseInt(document.getElementById('valor').value);
    
    // Validação
    if (!nome || !instagram || !seguidores || !consultas || !valorConsulta) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Cálculos
    const faturamentoMensal = consultas * valorConsulta;
    const faturamentoAnual = faturamentoMensal * 12;
    
    // 1% dos seguidores compram, R$ 697 cada, 3 lançamentos/ano
    const potencialAnual = Math.round(seguidores * 0.01 * 697 * 3);
    
    const perdendoAnual = potencialAnual - faturamentoAnual;
    const perdendoMensal = Math.round(perdendoAnual / 12);
    
    // Formata números
    const faturamentoAnualF = faturamentoAnual.toLocaleString('pt-BR');
    const potencialAnualF = potencialAnual.toLocaleString('pt-BR');
    const perdendoAnualF = perdendoAnual.toLocaleString('pt-BR');
    const perdendoMensalF = perdendoMensal.toLocaleString('pt-BR');
    const seguidoresF = seguidores.toLocaleString('pt-BR');

    // Determina ranking
let ranking = '';
let cor = '';

if (perdendoAnual >= 50000) {
    ranking = '🔴 ALERTA VERMELHO';
    cor = 'red';
} else if (perdendoAnual >= 30000) {
    ranking = '🟠 ALERTA LARANJA';
    cor = 'orange';
} else if (perdendoAnual >= 10000) {
    ranking = '🟡 ALERTA AMARELO';
    cor = 'yellow';
} else {
    ranking = '🟢 TUDO BEM';
    cor = 'green';
}

// Adiciona no HTML do resultado
const rankingHTML = `
    <div style="background: rgba(230,57,70,0.1); border-left: 4px solid ${cor}; padding: 20px; margin: 24px 0; border-radius: 8px;">
        <h3 style="color: ${cor}; font-size: 24px; margin-bottom: 8px;">
            ${ranking}
        </h3>
        <p>Você está perdendo <strong>R$ ${perdendoAnualF}/ano</strong></p>
    </div>
`;
```

---

### **NÍVEL 2: Barra de progresso animada (médio — adiciona essa semana)**

**Como funciona:**

Resultado mostra **barra de progresso** tipo "carregando":
```
⚡ ANALISANDO SEUS DADOS...

[████████████░░░░░░░░] 60%

Calculando quanto você está perdendo...
```

**Depois de 3 segundos:**
```
✅ ANÁLISE COMPLETA!

📊 Resultado: Você está perdendo R$ 52.000/ano
```

**Por que isso funciona:**
✅ **Antecipação** (pessoa fica curiosa esperando)  
✅ **Parece mais "profissional"** (não é instantâneo)  
✅ **Dopamina** (revelação gradual = mais impacto)  

---

### **NÍVEL 3: Compartilhamento social + Badge (avançado — adiciona mês 2)**

**Como funciona:**

Depois do resultado:
```
🏆 VOCÊ DESBLOQUEOU O BADGE:

[IMAGEM: Badge "Alerta Vermelho - R$ 52k perdidos"]

📲 Compartilhe seu resultado nos stories e marque @plinioventavoli

[BOTÃO: COMPARTILHAR NO INSTAGRAM]
    
    // Monta resultado
    const resultado = `
        <h2>📊 SEU RESULTADO, ${nome}:</h2>
        
        <p>Você atende <strong>${consultas} mães/mês</strong>.</p>
        <p>Faturamento atual: <strong>R$ ${faturamentoAnualF}/ano</strong></p>
        
        <p style="margin-top: 24px;">Mas você tem <strong>${seguidoresF} seguidores</strong>.</p>
        <p>Se <strong>apenas 1%</strong> deles comprasse um programa de <strong>R$ 697</strong>:</p>
        
        <p class="destaque">💰 Faturamento potencial: <strong>R$ ${potencialAnualF}/ano</strong></p>
        
        <p class="alerta">📉 Você está perdendo: <strong>R$ ${perdendoAnualF}/ano</strong></p>
        <p class="alerta">⚠️ Todo mês: <strong>R$ ${perdendoMensalF}</strong></p>
        
        <p style="margin-top: 32px; font-size: 20px;">
            Enquanto você não tem produto digital, <strong>suas seguidoras estão comprando da concorrente</strong>.
        </p>
        
        <a href="https://wa.me/5535997140204?text=Oi%20Plínio,%20acabei%20de%20fazer%20a%20calculadora%20e%20quero%20parar%20de%20perder%20R$%20${perdendoMensalF}%20por%20mês!" class="btn-cta" target="_blank">
            QUERO PARAR ISSO AGORA
        </a>
    `;
    
    // Mostra resultado
    document.getElementById('resultado-conteudo').innerHTML = resultado;
    document.getElementById('resultado').style.display = 'block';
    
    // Scroll suave até resultado
    document.getElementById('resultado').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Facebook Pixel - Track CustomEvent
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Calculadora Preenchida',
            value: perdendoAnual,
            currency: 'BRL'
        });
    }
}
