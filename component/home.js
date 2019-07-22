const home = { template: `
    <div id="home">
        <div class="pageTitle">
            <h1>FC/AP表</h1>
        </div>
        <div v-if="loading">
            Loading...（・8・）
        </div>
        <div v-if="error">
            エラー...（Ｘ8Ｘ）
            {{ error.msg }}
        </div>
        <div v-if="content">
            <div class="filter">
                <p>グループ</p>
                <div class="candidate">
                    <input type="radio" id="singerMs" value="ms" v-model="content.filter.singer" />
                    <label for="singerMs">
                        <b class="singer ms">μ’s</b>
                    </label>
                    <input type="radio" id="singerAq" value="aq" v-model="content.filter.singer" />
                    <label for="singerAq">
                        <b class="singer aq">Aqours</b>
                    </label>
                </div>
            </div>
            <div class="filter">
                <p>難易度</p>
                <div class="candidate">
                    <input type="radio" id="typrCh" value="ch" v-model="content.filter.type" />
                    <label for="typrCh">
                        <b class="type ch">CHALLENGE</b>
                    </label>
                    <input type="radio" id="typrSw" value="sw" v-model="content.filter.type" />
                    <label for="typrSw">
                        <b class="type sw">SWITCH</b>
                    </label>
                    <input type="radio" id="typrPs" value="pl" v-model="content.filter.type" />
                    <label for="typrPs">
                        <b class="type pl">PLUS</b>
                    </label>
                </div>
            </div>

            <div class="dTable">
                <div class="rowLvl" v-for="lvl of getLevelList()">
                    <div class="dsp">
                        {{ lvl }}
                    </div>
                    <div class="levelMain">
                        <p v-for="(music, index) in getMuscicsByLevel(lvl)" :key="index" class="music"
                            v-bind:style="getCellStyle(music)"
                            v-bind:class="getAchive(music)"
                            v-on:click="toggleAchive(music)">
                            {{ music.title }}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <b class="sampleFc">■</b>フルコンボ<br />
                <b class="sampleAp">■</b>オールパーフェクト（120%未満）<br />
                <b class="sampleNjap">■</b>ジャッジなしオールパーフェクト（120%）
            </div>
        </div>
    </div>
`,
    data() {
        return {
            loading: false,
            error: null,
            content: null
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    computed: {

    },
    methods: {
        fetchData () {
            const me = this
            me.loading = true
            me.error = null
            me.content = null

            me.content = {
                musics: me.getMusics(),
                achivements: me.getAchivements(),
                filter: {
                    singer: "ms",
                    type: "ch"
                }
            } 
            me.loading = false
        },
        getCellStyle(m) {
            const setting = this.getSettings().dTable
            let rtn = {
                "width": "calc(100% / "  + setting.rows + ")",
                "height": setting.height + "px",
                "font-size": setting.fontSize + "pt"
            }
            if (m.levelSub) rtn.order = m.levelSub
            return rtn
        },
        getAchive(m) {
            const ach = this.content.achivements.find(x => {
                return x.musicId == m.musicId && x.type == m.type
            })
            return ach == null ? "" : ach.achive
        },
        toggleAchive(m) {
            let ach = this.getAchive(m)
            switch (ach) {
                case "":     ach = "fc"; break;
                case "fc":   ach = "ap"; break;
                case "ap":   ach = "njap"; break;
                case "njap": ach = ""; break;
            }
            let tgt = this.content.achivements.find(x => {
                return x.musicId == m.musicId && x.type == m.type
            })
            if (tgt != null) {
                tgt.achive = ach
            } else {
                tgt = {
                    musicId: m.musicId,
                    type: m.type,
                    achive: ach,
                    memo: ""
                }
                this.content.achivements.push(tgt)
            }
            this.saveAchivements(this.content.achivements)
        },
        getLevelList() {
            const me = this
            let lvAry = me.content.musics.filter((m) => {
                return m.singer == me.content.filter.singer
                        && m.type == me.content.filter.type
            }).reduce((ac, cv, ci, ar) => {
                if (!ac.includes(cv.levelMain)) {
                    ac.push(cv.levelMain)
                }
                return ac
            }, [])
            lvAry.sort((x, y) => {
                return x > y ? -1 : (x < y ? 1 : 0)
            })
            return lvAry
        },
        getMuscicsByLevel(lvl) {
            const me = this
            return me.content.musics.filter((m) => {
                return m.singer == me.content.filter.singer
                        && m.type == me.content.filter.type
                        && m.levelMain == lvl
            })
        }
    }
};