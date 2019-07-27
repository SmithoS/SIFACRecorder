const err = {
    template: `
    <div id="err">
        <div class="pageTitle">
            <h1>エラー</h1>
        </div>
        <div>
            <p>システムエラーが発生しました（Ｘ8Ｘ）</p>
            <div v-if="content.error">
                <p>{{ content.error.message }}</p>
                <p>{{ content.error.stack }}</p>
            </div>
        </div>
    </div>
`,
data() {
    return {
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
        const err = ErrorArray.popError()

        me.content = {
            error: err
        }
    }
}
};