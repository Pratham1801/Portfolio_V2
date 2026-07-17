$(document).ready(function () {
  const roles = ['Full Stack Developer', 'Web Developer', 'Software Engineer'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      $('#typed-role').text(currentRole.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      $('#typed-role').text(currentRole.slice(0, charIndex - 1));
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 40 : 90;
    setTimeout(typeEffect, speed);
  }

  typeEffect();

  $('#read-more-btn').on('click', function () {
    $(this).text($(this).text() === 'Read More' ? 'Read Less' : 'Read More');
  });

  // --- Skill bar animation ---
  function animateSkillBars() {
    $('.bar-fill').each(function () {
      const target = $(this).data('width');
      $(this).css('width', target + '%');
    });
  }

  const skillsSection = document.getElementById('skills');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);

  // --- Project filter buttons ---
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).data('filter');

    $('.project-card').each(function () {
      if (filter === 'all' || $(this).data('category') === filter) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });


  $('#contact-form').on('submit', function (e) {
  e.preventDefault();

  const name = $(this).find('input[name="name"]').val();
  const email = $(this).find('input[name="email"]').val();
  const message = $(this).find('textarea[name="message"]').val();

  console.log('Form submitted:', { name, email, message });
  alert('Message sent! (Demo only — we\'ll wire up real email delivery next.)');

  this.reset();
});

});