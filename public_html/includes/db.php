<?php

    try {

      // データベースに接続
      $con = new PDO(
          'mysql:host=localhost;dbname=falcon;charset=utf8mb4',
          'hayabusa',
          'gsx1300r',
          [
              PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
              PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
              // PDO::ATTR_EMULATE_PREPARES => false, // 出力が全てstring(文字)になるのを防ぐ
          ]
      );

      /* データベースから値を取ってきたり， データを挿入したりする処理 */

    } catch (PDOException $e) {

      // エラーが発生した場合は「500 Internal Server Error」でテキストとして表示して終了する
      // - もし手抜きしたくない場合は普通にHTMLの表示を継続する
      // - ここではエラー内容を表示しているが， 実際の商用環境ではログファイルに記録して， Webブラウザには出さないほうが望ましい
      header('Content-Type: text/plain; charset=UTF-8', true, 500);
      exit($e->getMessage());

    }