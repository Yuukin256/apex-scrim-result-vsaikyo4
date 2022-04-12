import { HTMLAttributes, VFC } from 'react';

const SiteDescription: VFC<HTMLAttributes<HTMLParagraphElement>> = (props) => (
  <p {...props}>
    2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム)
    の試合結果一覧です。有志が非公式で公開しています。正確性を保つ努力はしておりますが、
    <strong>集計に誤りがある可能性があります。</strong>
    ご了承ください。間違いに気づかれた方は、ページ最下部に表示したTwitterアカウントにご連絡ください。
  </p>
);

export default SiteDescription;
