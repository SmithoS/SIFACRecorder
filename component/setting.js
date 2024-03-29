const setting = {
    template: `
    <div id="setting" class="page">
        <div class="pageTitle">
            <h1>設定</h1>
        </div>
        <div v-if="loading">
            Loading...（・8・）
        </div>
        <div v-if="error">
            エラー...（Ｘ8Ｘ）
            {{ error.msg }}
        </div>
        <div v-if="content">
            <h2>設定</h2>
            <div>
                <div>
                    <h3>FC/AP表</h3>
                    <dl>
                        <dt>１列に表示する曲数</dt>
                        <dd>
                            <input type="number" v-model="content.settings.dTable.rows" />
                        </dd>
                        <dt>１マスの高さ</dt>
                        <dd>
                            <input type="number" v-model="content.settings.dTable.height" />
                        </dd>
                        <dt>曲名文字サイズ</dt>
                        <dd>
                            <input type="number" v-model="content.settings.dTable.fontSize" />
                        </dd>
                    </dl>
                    <h3>目標</h3>
                    <dl>
                        <dt>テキスト変換方法</dt>
                        <dd>
                            <select v-model="content.settings.aim.parse">
                                <option value="txt">テキスト</option>
                                <option value="md">Markdown</option>
                            </select>
                            <p>
                                分からないかたは「テキスト」を選択してください。<br />
                                Markdownではサニタイズなど行いません。選択される場合はよく理解した上でご利用ください。
                            </p>
                        </dd>
                    </dl>
                    <h3>装飾</h3>
                    <dl>
                        <dt>寝そべり</dt>
                        <dd>
                            <input type="checkbox" id="chkNeso" v-model="content.settings.deco.neso">
                            <label for="chkNeso">表示する</label>
                        </dd>
                    </dl>
                </div>
                <div class="saveLine">
                    <button class="ok" v-on:click="updateSetting">保存</button>
                </div>
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
methods: {
    fetchData () {
        const me = this
        me.loading = true
        me.error = null
        me.content = null
        
        me.content = {
            settings: me.getSettings()
        }
        me.loading = false
    },
    updateSetting() {
        this.saveSettings(this.content.settings)
        alert("保存しました")
    }
}
};