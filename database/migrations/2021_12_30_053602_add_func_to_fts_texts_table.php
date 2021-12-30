<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFuncToFtsTextsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('fts_texts', function (Blueprint $table) {
            //
        });

$sql = 'CREATE TEXT SEARCH CONFIGURATION pali ( parser = pg_catalog.default );';
DB::connection()->getPdo()->exec($sql);

$sql = 'CREATE TEXT SEARCH CONFIGURATION pali_unaccent ( parser = pg_catalog.default );';
DB::connection()->getPdo()->exec($sql);

$sql = 'CREATE TEXT SEARCH DICTIONARY pali_stem ( TEMPLATE = synonym, SYNONYMS = pali );';
DB::connection()->getPdo()->exec($sql);

$sql = ' CREATE TEXT SEARCH DICTIONARY pali_stopwords ( TEMPLATE = pg_catalog.simple, STOPWORDS = pali, ACCEPT = true);';
DB::connection()->getPdo()->exec($sql);

$sql = '
ALTER TEXT SEARCH CONFIGURATION pali
ADD MAPPING FOR asciiword, word, hword_part, hword_asciipart
WITH pali_stem, pali_stopwords;';
DB::connection()->getPdo()->exec($sql);

$sql = '
CREATE EXTENSION IF NOT EXISTS "unaccent";
ALTER TEXT SEARCH CONFIGURATION pali_unaccent
ADD MAPPING FOR asciiword, word, hword_part, hword_asciipart
WITH unaccent, pali_stem, pali_stopwords;';
DB::connection()->getPdo()->exec($sql);


$sql = "ALTER TABLE fts_texts 
ADD COLUMN full_text_search_weighted TSVECTOR 
GENERATED ALWAYS AS (
   setweight(to_tsvector('pali', coalesce(content,'')), 'A')  || ' ' ||
   setweight(to_tsvector('pali', coalesce(bold_single,'')), 'B') || ' '  ||
   setweight(to_tsvector('pali', coalesce(bold_double,'')), 'C') || ' ' ||
   setweight(to_tsvector('pali', coalesce(bold_multiple,'')), 'D')
) STORED;
";
DB::connection()->getPdo()->exec($sql);

$sql = "
ALTER TABLE fts_texts 
ADD COLUMN full_text_search_weighted_unaccent TSVECTOR 
GENERATED ALWAYS AS ( 
setweight(to_tsvector('pali_unaccent', coalesce(content,'')), 'A')  || ' ' || 
setweight(to_tsvector('pali_unaccent', coalesce(bold_single,'')), 'B') || ' '  || 
setweight(to_tsvector('pali_unaccent', coalesce(bold_double,'')), 'C') || ' ' || 
setweight(to_tsvector('pali_unaccent', coalesce(bold_multiple,'')), 'D') 
) STORED;";
DB::connection()->getPdo()->exec($sql);

$sql = "CREATE INDEX full_text_search_weighted_idx ON fts_texts USING GIN (full_text_search_weighted);";
DB::connection()->getPdo()->exec($sql);

$sql = "CREATE INDEX full_text_search_weighted__unaccent_idx ON fts_texts USING GIN (full_text_search_weighted_unaccent);";
DB::connection()->getPdo()->exec($sql);


$sql = "CREATE OR REPLACE FUNCTION query_pali(query_str TEXT) 
  RETURNS TABLE(
          rank REAL,
          paragraph INTEGER,
          wid VARCHAR,
          bold_single TEXT,
          bold_double TEXT,
          bold_multiple TEXT,
          content TEXT,
          full_text_search_weighted TSVECTOR,
          full_text_search_weighted_unaccent TSVECTOR) 
AS $$
    SELECT
    ts_rank('{0.1, 0.2, 0.4, 1}',
        full_text_search_weighted,
        websearch_to_tsquery('pali', query_str)) +
    ts_rank('{0.1, 0.2, 0.4, 1}',
        full_text_search_weighted_unaccent,
        websearch_to_tsquery('pali_unaccent', query_str)), -- AS rank
        paragraph, wid, bold_single, bold_double, bold_multiple, content,
        full_text_search_weighted, full_text_search_weighted_unaccent
    FROM fts_texts
    WHERE
        full_text_search_weighted @@ websearch_to_tsquery('pali', query_str) OR
        full_text_search_weighted_unaccent @@ websearch_to_tsquery('pali_unaccent', query_str);
$$ LANGUAGE SQL;";
		DB::connection()->getPdo()->exec($sql);
		
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fts_texts', function (Blueprint $table) {
            //
        });

		# 删除全文检索配置 pali
		$sql ='DROP TEXT SEARCH CONFIGURATION  pali ;';
		DB::connection()->getPdo()->exec($sql);

		# 删除全文检索配置 pali_unaccent 无标音符号版
		$sql ='DROP TEXT SEARCH CONFIGURATION pali_unaccent ;';
		DB::connection()->getPdo()->exec($sql);


		# 删除巴利语词形转换字典
		$sql ='DROP TEXT SEARCH DICTIONARY pali_stem ;';
		DB::connection()->getPdo()->exec($sql);

		# 删除巴利语停用词字典
		$sql ='DROP TEXT SEARCH DICTIONARY pali_stopwords ;';
		DB::connection()->getPdo()->exec($sql);


		$sql ='DROP EXTENSION "unaccent";';
		DB::connection()->getPdo()->exec($sql);

		# 删除查询函数

		$sql ='DROP  FUNCTION query_pali ;';
		DB::connection()->getPdo()->exec($sql);
    }
}
