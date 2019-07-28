const info = {
    template: `
    <div id="info" class="page">
        <div class="pageTitle">
            <h1>インフォメーション</h1>
        </div>
        <div v-if="loading">
            Loading...（・8・）
        </div>
        <div v-if="error">
            エラー...（Ｘ8Ｘ）
            {{ error.msg }}
        </div>
        <transition name="ct">
        <div v-if="content">
            <h2>しおり マス数一覧</h2>
            <div>
                <table>
                    <tr><th>しおり</th><th>グループ</th></th><th>マス</th></tr>
                    <tr><td>アキバ</td><td>μ's</td><td>48</td></tr>
                    <tr><td>沼津駅周辺</td><td>Aqours</td><td>48</td></tr>
                    <tr><td>沼津漁港周辺</td><td>Aqours</td><td>37</td></tr>
                    <tr><td>海外</td><td>μ's</td><td>37</td></tr>
                    <tr><td>アキバ郊外</td><td>μ's, Aqours</td><td>40</td></tr>
                    <tr><td>ハコダテ</td><td>μ's, Aqours</td><td>？</td></tr>
                    <tr><td>ナゴヤ</td><td>μ's, Aqours</td><td>44</td></tr>
                    <tr><td>オオサカ</td><td>μ's, Aqours</td><td>44</td></tr>
                    <tr><td>フクオカ</td><td>μ's, Aqours</td><td>44</td></tr>
                    <tr><td>ヒロシマ</td><td>μ's, Aqours</td><td>44</td></tr>
                    <tr><td>センダイ</td><td>μ's, Aqours</td><td>？</td></tr>
                    <tr><td>カガワ</td><td>μ's, Aqours</td><td>45</td></tr>
                    <tr><td>イタリア グルメ編</td><td>Aqours</td><td>68</td></tr>
                    <tr><td>市民の森 キャンプ編</td><td>Aqours</td><td>？</td></tr>
                </table>
            </div>
            <h2>リンク</h2>
            <div>
                <ul>
                    <li><a href="http://www.lovelive-sifacns.jp/">スクフェスAC公式</a></li>
                    <li><a href="https://members.lovelive-sifacns.jp/">スクフェスAC カスタマイズサイト</a></li>
                </ul>
            </div>
            <h2>このアプリについて</h2>
            <div>
                <ul>
                    <li><a href="https://github.com/SmithoS/SIFACRecorder">Github プロジェクトページ</a></li>
                </ul>
            </div>
        </div>
        </transition>
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
        
        me.content = {}
        me.loading = false
    }
}
};