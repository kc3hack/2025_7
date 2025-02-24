本作品は [Next.js](https://nextjs.org/) プロジェクトで、React と TailwindCSS を用いて構築されています。

## はじめに
この作品を動かすには、Node.js（バージョン16以上推奨）が必要です。まだインストールしていない場合は、[Node.js公式サイト](https://nodejs.org/)などからインストールしてください。

### セットアップ


Node.js をインストール後、プロジェクトのディレクトリに移動して、以下のコマンドを用いて依存パッケージをインストールしてください:


```bash
npm insall 

次に、GeminiAPIの利用のために以下のコマンドを入力してください

npm install @google/genarative-ai

その後、HACK_REディレクトリ内に「.env.local」という名称のファイルを作成し、

GEMINI_API_KEY = "適切なAPIキーで置換"

最後に、

npm run dev

のコマンドを使用して [http://localhost:3000](http://localhost:3000)  をブラウザで開くことで動作させることが出来ます。

使用した技術に関する詳細は以下のリソースをご覧ください:

- [React Documentation](https://react.dev/) 
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Next.js Documentation](https://nextjs.org/docs) 
- [Learn Next.js](https://nextjs.org/learn)
