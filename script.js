document.getElementById('chat-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // evita que salte de línea
    sendMessage();
  }
});


 let lastTopic = null;
    const contactoWhatsApp = '300 000 0000';

    function toggleChat() {
      const chat = document.getElementById('chatbox');
      chat.style.display = chat.style.display === 'none' || chat.style.display === '' ? 'block' : 'none';
    }

    function sendMessage() {
      const input = document.getElementById('chat-input');
      const content = document.getElementById('chat-content');
      const message = input.value.trim();

      if (message) {
        content.innerHTML += `<div class='mb-2 text-sm text-right'>🙋‍♀️: ${message}</div>`;
        input.value = '';

        setTimeout(() => {
          const reply = getBotReply(message);
          content.innerHTML += `<div class='mb-2 text-sm'>🤖: ${reply}</div>`;
          content.scrollTop = content.scrollHeight;
        }, 600);
      }
    }

    // Activar envío con tecla Enter
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('chat-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });
    });

function getBotReply(message) {
  const text = message.toLowerCase().trim();

  // Helper for keyword matching
  function matchesAny(keywords) {
    return keywords.some((kw) => text.includes(kw));
  }

  // Helper for price responses
  function getPriceResponse(type) {
    lastTopic = `precio-${type}`;
    const responses = {
      individual: `Gracias por tu interés 🌿 La consulta individual tiene un valor entre **$95.000 y $150.000 COP**, dependiendo del profesional y modalidad. Escríbenos al 📱 *${contactoWhatsApp}* para conocer opciones y disponibilidad.`,
      grupal: `¡Genial que te interese una sesión grupal! 👥 Estas suelen tener un precio más accesible, desde **$60.000 COP por persona**, según el número de participantes y temática. Escríbenos al 📱 *${contactoWhatsApp}* para más detalles o para apartar tu cupo.`,
      familiar: `Las sesiones familiares ayudan a fortalecer la comunicación en casa 🏠. Suelen costar entre **$120.000 y $160.000 COP**. Escríbenos al 📱 *${contactoWhatsApp}* y con gusto te guiamos.`,
      pareja: `Las terapias de pareja 🫶 tienen un valor promedio de **$120.000 COP por sesión** y están orientadas a fortalecer vínculos emocionales. Si deseas agendar, puedes escribirnos al 📱 *${contactoWhatsApp}*.`,
      vocacional: `La orientación vocacional es ideal para quienes buscan claridad en su camino académico o laboral 🎓. La consulta cuesta alrededor de **$100.000 COP** e incluye test especializados. ¿Quieres más información? Escríbenos al 📱 *${contactoWhatsApp}*.`
    };
    return responses[type];
  }

  // Sí/No logic
  if ((text === 'sí' || text === 'si') && lastTopic) {
    const replyMap = {
      ansiedad: `Perfecto, podemos agendar una sesión contigo para trabajar la ansiedad. Escríbenos al 📱 *${contactoWhatsApp}*.`,
      depresión: `Me alegra que quieras dar un paso. Puedes agendar atención virtual o presencial escribiéndonos al 📱 *${contactoWhatsApp}*.`,
      terapia: `Genial, es un buen inicio. Agenda escribiéndonos al 📱 *${contactoWhatsApp}*. ¿Qué horario te conviene más?`,
      ayuda: `Estoy aquí para ti. Escríbenos al 📱 *${contactoWhatsApp}* y te conectamos con un profesional.`,
      saludo: '¡Qué bueno saber de ti! ¿En qué podemos ayudarte hoy?',
      estrés: 'Gracias por contármelo. ¿Quieres conocer algunas técnicas de manejo del estrés?',
      ubicación: `Excelente. Puedes visitarnos en Valledupar o agendar una videollamada al 📱 *${contactoWhatsApp}*.`,
      precio: `Con gusto. Escríbenos al 📱 *${contactoWhatsApp}* para más detalles sobre tarifas y disponibilidad.`
    };
    return replyMap[lastTopic] || 'Gracias por tu respuesta. Seguimos contigo.';
  }

  if (text === 'no' && lastTopic) {
    return 'Entiendo, sin presión. Estamos aquí si en el futuro necesitas orientación o apoyo.';
  }

  // Topic detection
  const topicKeywords = [
    { topic: 'ansiedad', keywords: ['ansiedad', 'nervioso', 'angustia'], response: 'La ansiedad y la angustia tienen manejo. ¿Te sientes identificado con esto?' },
    { topic: 'depresión', keywords: ['depresión', 'triste', 'desmotivado'], response: 'Lamento que te sientas así. ¿Te gustaría que te contemos cómo podemos ayudarte?' },
    { topic: 'terapia', keywords: ['terapia', 'psicólogo', 'consulta'], response: 'Ofrecemos sesiones en línea y presenciales. ¿Te interesa agendar una consulta?' },
    { topic: 'ayuda', keywords: ['ayuda', 'acompañamiento', 'apoyo'], response: 'Cuéntame cómo te sientes. ¿Te gustaría conversar con alguien del equipo?' },
    { topic: 'saludo', keywords: ['hola', 'buenas', 'saludos'], response: 'Hola, gracias por contactarnos. ¿Cómo podemos ayudarte hoy?' },
    { topic: 'estrés', keywords: ['estrés', 'agotado', 'presión'], response: 'El estrés puede sentirse abrumador. ¿Estás sintiendo mucha presión últimamente?' },
    { topic: 'ubicación', keywords: ['ubicación', 'dónde están', 'dirección', 'ubicados'], response: 'Nuestro consultorio está ubicado en Valledupar, Cesar. También ofrecemos atención virtual para mayor comodidad. ¿Te gustaría agendar una cita?' },
    { topic: 'precio', keywords: ['precio', 'costo', 'valor'], response: 'Nuestros precios varían según el servicio. ¿Qué tipo de consulta te interesa?' }
  ];

  for (const { topic, keywords, response } of topicKeywords) {
    if (matchesAny(keywords)) {
      lastTopic = topic;
      return response;
    }
  }

  // Price details
  if (text.includes('individual')) return getPriceResponse('individual');
  if (text.includes('grupal')) return getPriceResponse('grupal');
  if (text.includes('familiar')) return getPriceResponse('familiar');
  if (text.includes('pareja')) return getPriceResponse('pareja');
  if (text.includes('vocacional')) return getPriceResponse('vocacional');

  // Contact info
  if (matchesAny(['contacto', 'número', 'celular', 'whatsapp', 'teléfono'])) {
    lastTopic = 'contacto';
    return `Puedes comunicarte con nosotros al 📱 *${contactoWhatsApp}*. También estamos disponibles por WhatsApp para agendar o resolver cualquier duda.`;
  }

  // Appointment
  if (matchesAny(['cita', 'agendar', 'reservar'])) {
    lastTopic = null;
    return `Claro, puedes agendar fácilmente escribiéndonos al 📱 *${contactoWhatsApp}*. Un profesional te atenderá pronto.`;
  }
if (
  text.includes('gracias') ||
  text.includes('eso es todo') ||
  text.includes('hasta luego') ||
  text.includes('adiós') ||
  text.includes('nos hablamos') ||
  text.includes('chau') ||
  text.includes('cuidate') ||
  text.includes('cuídate') ||
  text.includes('nos vemos') ||
  text.includes('ya no necesito más') ||
  text.includes('me sirvió mucho')
) {
  lastTopic = 'despedida';
  return 'Gracias a ti por escribir 🤗 Si en el futuro necesitas apoyo, aquí estaremos para acompañarte. ¡Cuídate mucho!';
}
  lastTopic = null;
  return 'Gracias por escribir. Un profesional te responderá lo antes posible.';
}



document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Si el elemento que apareció es una lista animada, también marca los items
        if (entry.target.classList.contains('anim-list')) {
          const items = entry.target.querySelectorAll('.fade-in-item');
          items.forEach((item, index) => {
            item.style.transitionDelay = `${0.2 + index * 0.2}s`;
          });
        }
      }
    });
  });

  document.querySelectorAll('.scroll-fade, .anim-list').forEach(el => observer.observe(el));
});
// Contador animado
document.addEventListener('DOMContentLoaded', () => {
      const counters = document.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-count');
          const isPercent = counter.hasAttribute('data-percent');
          const increment = target / 100;
          let count = 0;

          const animate = () => {
            count += increment;
            if (count < target) {
              counter.innerText = isPercent ? `${Math.floor(count)}%` : `${Math.floor(count)}+`;
              requestAnimationFrame(animate);
            } else {
              counter.innerText = isPercent ? `${target}%` : `${target}+`;
            }
          };

          animate();
        };
        updateCount();
      });
    });