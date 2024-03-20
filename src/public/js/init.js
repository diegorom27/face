((d)=>{
    d.addEventListener('scroll', (e) => {
        e.preventDefault();
    });
    const first = d.getElementById('first');
    first.focus();
    first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
})(document);