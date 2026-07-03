// Diagnostic script to send ScrollTrigger information to server console
setTimeout(() => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach((st, i) => {
      const msg = encodeURIComponent(`Trigger ${i}: class=${st.trigger ? st.trigger.className : 'none'} start=${st.start} end=${st.end} progress=${st.progress}`);
      fetch(`/log-error?msg=${msg}&url=diagnostic&line=0&col=0`);
    });
    fetch(`/log-error?msg=${encodeURIComponent('Total ScrollTriggers count: ' + ScrollTrigger.getAll().length)}&url=diagnostic&line=0&col=0`);
  } else {
    fetch(`/log-error?msg=${encodeURIComponent('ScrollTrigger not defined')}&url=diagnostic&line=0&col=0`);
  }
}, 3000);
