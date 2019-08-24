const _KEY_MUSIC = "musics"
const _KEY_SETTING = "setting"
const _KEY_ACHIVEMENTS = "achivements"
const _KEY_AIM = "aim"
const _MUSIC_DATA_URL = "https://script.google.com/macros/s/AKfycbyBbl-WTFwtBm3SaqybpOdr5TK9_sGSsLEOY0wkya0IPpFVBAs/exec"

const logic_database = {
    methods: {
        getSettings() {
            let rtn = null;
            let val = localStorage.getItem(_KEY_SETTING);
            if (val != null) {
                rtn = JSON.parse(val)
            } else {
                rtn = {}
            }
            return Complement(rtn, {
                dTable: {
                    rows: 10,
                    height: 60,
                    fontSize: 8
                },
                aim: {
                    parse: "txt"
                },
                deco: {
                    neso: false
                }
            })
        },
        saveSettings(val) {
            if (val != null) {
                localStorage.setItem(_KEY_SETTING, JSON.stringify(val))
            }
        },
        getAchivements() {
            let rtn = null;
            let val = localStorage.getItem(_KEY_ACHIVEMENTS);
            if (val != null) {
                rtn = JSON.parse(val)
            } else {
                rtn = []
            }
            return rtn
        },
        saveAchivements(val) {
            if (val != null) {
                localStorage.setItem(_KEY_ACHIVEMENTS, JSON.stringify(val))
            }
        },
        getAim() {
            let rtn = null;
            let val = localStorage.getItem(_KEY_AIM);
            if (val != null) {
                rtn = JSON.parse(val)
            } else {
                rtn = {
                    text: ""
                }
            }
            return rtn
        },
        saveAim(val) {
            if (val != null) {
                localStorage.setItem(_KEY_AIM, JSON.stringify(val))
            }
        },
        getMusics() {
            let musics = MyCache.get(_KEY_MUSIC)
            if (musics == null) {
                let req = new Request(_MUSIC_DATA_URL, {
                    method : "GET"
                })
                return fetch(_MUSIC_DATA_URL, {method: "GET"})
                    .then((res) => res.json())
                    .then((json) => {
                        MyCache.set(_KEY_MUSIC, json)
                        return new Promise((resolve, reject) => {
                            resolve(json)
                        })
                    })
            } else {
                return new Promise((resolve, reject) => {
                    resolve(musics)
                })
            }
        }
    }
}

let MyCache = (() => {
    let _cache = {}
    return {
        get: (key) => {
            return _cache[key]
        },
        set: (key, val) => {
            _cache[key] = val
        }
    }
})()

let ErrorArray = (() => {
    let _ary = []
    return {
        pushError: (err) => {
            _ary.push(err)
        },
        popError: () => {
            return _ary.pop()
        }
    }
})()

function Complement(a, b) {
    Object.keys(b).forEach((key) => {
        a[key] = (key in a) ? ((typeof a[key] === "object" && typeof b[key] === "object") ? Complement(a[key], b[key]) : a[key]) : b[key];
    })
    return a
}