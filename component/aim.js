const aim = {
    template: `
    <div id="aim">
        <div class="pageTitle">
            <h1>目標、雑記</h1>
        </div>
        <div v-if="loading">
            Loading...（・8・）
        </div>
        <div v-if="error">
            エラー...（Ｘ8Ｘ）
            {{ error.msg }}
        </div>
        <div v-if="content">
            <div class="cm" v-html="parseText">
            </div>
            <div>
                <textarea v-model="content.aim.text" v-on:blur="save" v-bind:style="getTextboxStyle"></textarea>
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
    parseText() {
        const setting = this.getSettings().aim
        let rtn;
        switch (setting.parse) {
            case "md":
                rtn = marked(this.content.aim.text)
                break;
            case "txt":
            default:
                rtn = this.content.aim.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                rtn = rtn.replace(/\n/g, "<br />").replace(/\r/g, "")
                break;
        }
        return rtn;
    },
    getTextboxStyle() {
        let cnt = Math.max(3, ((this.content.aim.text.match(/\n/g) || []).length + 1))
        return {
            lineHeight: "19px",
            height: (cnt * 19 + 5) + "px"
        }
    }
},
methods: {
    fetchData () {
        const me = this
        me.loading = true
        me.error = null
        me.content = null
        
        me.loading = false
        me.content = {
            aim: me.getAim(),
            textareastyle: {
                lineHeight: "19px",
                height: "38px"
            }
        }
    },
    save() {
        this.saveAim(this.content.aim)
    }
}
};