const logic_init = {
    mounted () {
        const nesoAnime = this.getSettings().deco.neso
        if (nesoAnime) {
            let rid = ("00" + (Math.floor(Math.random() * 18) + 1)).slice(-2)
            let wrp = document.getElementById("wrapper")
    
            wrp.className = ""
            setTimeout(() => {wrp.className = "slideNeso rndm" + rid}, 10)
        }
    }
}