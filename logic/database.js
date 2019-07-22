const _KEY_SETTING = "setting"
const _KEY_ACHIVEMENTS = "achivements"
const _KEY_AIM = "aim"

const logic_database = {
    methods: {
        getSettings() {
            let rtn = null;
            let val = localStorage.getItem(_KEY_SETTING);
            if (val != null) {
                rtn = JSON.parse(val)
            } else {
                rtn = {
                    dTable: {
                        rows: 10,
                        height: 60,
                        fontSize: 8
                    },
                    aim: {
                        parse: "txt"
                    }
                }
            }
            return rtn
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
            return __musics
        }
    }
}
