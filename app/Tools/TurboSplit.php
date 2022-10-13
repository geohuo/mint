<?php
namespace App\Tools;
require_once __DIR__.'/../../public/app/public/casesuf.inc';

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\WordPart;
use App\Models\UserDict;


class TurboSplit
{
	protected $path = array();
	protected $isDebug = false;
	#当前搜索路径信心指数，如果过低，马上终止这个路径的搜索
	protected $currPathCf;
	#内存信心指数表
	protected $confidence = array();
	//结果数组
	protected $result = array();
	protected $part = array();
	//最大结果数量
	protected $MAX_RESULT = 100;
	protected $MAX_RESULT2 = 5;
	//最大递归深度
	protected $MAX_DEEP = 16;
	//连音规则表
	protected $sandhi = [
		["a" => "", "b" => "", "c" => "", "len" => 0, "adj_len" => 0, "advance" => false,"cf"=>1.0],
		["a" => "a", "b" => "a", "c" => "ā", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ā", "b" => "ā", "c" => "ā", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "ā", "c" => "ā", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ā", "b" => "a", "c" => "ā", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "e", "c" => "e", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "i", "c" => "i", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "o", "c" => "o", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "u", "c" => "o", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "a", "c" => "o", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "u", "c" => "ū", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "u", "c" => "u", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "ī", "c" => "ī", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "ū", "c" => "ū", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "i", "c" => "e", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "e", "b" => "a", "c" => "e", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "i", "c" => "ī", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "e", "c" => "e", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "a", "c" => "ya", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "atth", "c" => "atth", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "taṃ", "b" => "n", "c" => "tann", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "api", "c" => "mpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "eva", "c" => "meva", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[o]", "b" => "iva", "c" => "ova", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "o", "b" => "a", "c" => "o", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "ādi", "c" => "ādi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a[ānaṃ]", "b" => "a", "c" => "ānama", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "iti", "c" => "āti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "ca", "c" => "ñca", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "iti", "c" => "nti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "a", "c" => "ma", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ṃ", "b" => "a", "c" => "m", "len" => 1, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "ā", "c" => "mā", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "u", "c" => "mu", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "[ṃ]", "b" => "h", "c" => "ñh", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ā", "b" => "[ṃ]", "c" => "am", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "[ṃ]", "c" => "am", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ī", "b" => "[ṃ]", "c" => "im", "len" => 2, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ati", "b" => "tabba", "c" => "atabba", "len" => 6, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ati", "b" => "tabba", "c" => "itabba", "len" => 6, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "iti", "b" => "a", "c" => "icca", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "uṃ", "b" => "a", "c" => "uma", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u[ūnaṃ]", "b" => "a", "c" => "ūnama", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ī[īnaṃ]", "b" => "a", "c" => "īnama", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "su", "b" => "a", "c" => "sva", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ā", "b" => "iti", "c" => "āti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "iti", "c" => "āti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "e", "b" => "iti", "c" => "eti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ī", "b" => "iti", "c" => "īti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "iti", "c" => "īti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "o", "b" => "iti", "c" => "oti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ū", "b" => "iti", "c" => "ūti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "iti", "c" => "ūti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ṃ", "b" => "iti", "c" => "nti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ṃ", "b" => "ca", "c" => "ñca", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>1.0],
		["a" => "ṃ", "b" => "cāti", "c" => "ñcāti", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>1.0],
		["a" => "ṃ", "b" => "cet", "c" => "ñcet", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ṃ", "b" => "ev", "c" => "mev", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "a", "b" => "a", "c" => "a", "len" => 1, "adj_len" => -1, "advance" => true,"cf"=>0.99],
		["a" => "ī", "b" => "", "c" => "i", "len" => 1, "adj_len" => 0, "advance" => true,"cf"=>0.9],
	];

	protected $sandhi2 = [
		["a" => "ṃ", "b" => "ca", "c" => "ñca", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>1.0],
		["a" => "ṃ", "b" => "hi", "c" => "ñhi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>1.0],
		["a" => "a", "b" => "iti", "c" => "āti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "e", "b" => "iti", "c" => "eti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "i", "b" => "iti", "c" => "īti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "o", "b" => "iti", "c" => "oti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "u", "b" => "iti", "c" => "ūti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ṃ", "b" => "iti", "c" => "nti", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.99999],
		["a" => "ī", "b" => "eva", "c" => "iyeva", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ī", "b" => "eva", "c" => "īyeva", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "eva", "c" => "uyeva", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ṃ", "b" => "eva", "c" => "ṃyeva", "len" => 5, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "eva", "c" => "yeva", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "o", "b" => "eva", "c" => "ova", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ṃ", "b" => "eva", "c" => "meva", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "eva", "c" => "veva", "len" => 4, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "eva", "c" => "eva", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "e", "b" => "eva", "c" => "eva", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "a", "b" => "api", "c" => "āpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ā", "b" => "api", "c" => "āpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "e", "b" => "api", "c" => "epi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "i", "b" => "api", "c" => "īpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ī", "b" => "api", "c" => "īpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "o", "b" => "api", "c" => "opi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "api", "c" => "ūpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ū", "b" => "api", "c" => "ūpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "u", "b" => "api", "c" => "upi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
		["a" => "ṃ", "b" => "api", "c" => "mpi", "len" => 3, "adj_len" => 0, "advance" => false,"cf"=>0.9999],
	];

	/**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
		for($i=0;$i<$this->MAX_DEEP;$i++ ){
			array_push($this->path, array("", 0));
		}
		
        return;
    }

	/**
     * 从双元音处切开
     * @param  string  $word
     * @return void
     */
	public function splitDiphthong($word)
	{
		//diphthong table双元音表
		$search = array('aa', 'ae', 'ai', 'ao', 'au', 'aā', 'aī', 'aū', 'ea', 'ee', 'ei', 'eo', 'eu', 'eā', 'eī', 'eū', 'ia', 'ie', 'ii', 'io', 'iu', 'iā', 'iī', 'iū', 'oa', 'oe', 'oi', 'oo', 'ou', 'oā', 'oī', 'oū', 'ua', 'ue', 'ui', 'uo', 'uu', 'uā', 'uī', 'uū', 'āa', 'āe', 'āi', 'āo', 'āu', 'āā', 'āī', 'āū', 'īa', 'īe', 'īi', 'īo', 'īu', 'īā', 'īī', 'īū', 'ūa', 'ūe', 'ūi', 'ūo', 'ūu', 'ūā', 'ūī', 'ūū');
		$replace = array('a-a', 'a-e', 'a-i', 'a-o', 'a-u', 'a-ā', 'a-ī', 'a-ū', 'e-a', 'e-e', 'e-i', 'e-o', 'e-u', 'e-ā', 'e-ī', 'e-ū', 'i-a', 'i-e', 'i-i', 'i-o', 'i-u', 'i-ā', 'i-ī', 'i-ū', 'o-a', 'o-e', 'o-i', 'o-o', 'o-u', 'o-ā', 'o-ī', 'o-ū', 'u-a', 'u-e', 'u-i', 'u-o', 'u-u', 'u-ā', 'u-ī', 'u-ū', 'ā-a', 'ā-e', 'ā-i', 'ā-o', 'ā-u', 'ā-ā', 'ā-ī', 'ā-ū', 'ī-a', 'ī-e', 'ī-i', 'ī-o', 'ī-u', 'ī-ā', 'ī-ī', 'ī-ū', 'ū-a', 'ū-e', 'ū-i', 'ū-o', 'ū-u', 'ū-ā', 'ū-ī', 'ū-ū');
		//将双元音拆开
		//step 1 : split at diphthong . ~aa~ -> ~a-a~
		$word1 = str_replace($search, $replace, $word);
		//按连字符拆开处理
		$arrword = str_getcsv($word1, "-");
		return $arrword;
	}

	/**
     * 查询单词是否存在
     * @param  string  $word
     * @return array(int $wordWeight, int $endingLenght)
     */
	public function dict_lookup($word)
	{
		global $case;		//语尾表
		if (strlen($word) <= 1) {
			return array(0,0);
		}
		//去掉单词首尾的 []
		if(mb_substr($word,0,1) !== "["){
			$search = $word;
		}
		else{
			$search = str_replace("[","",$word);
			$search = str_replace("]","",$search);		
		}
		//获取单词权重
		$row = Cache::remember('palicanon/wordpart/weight/'.$search, 100 , function() use($search) {
			return WordPart::where('word',$search)->value('weight');
		});
		if ($row) {
			//找到
			return array($row,0);
		} else {
			//去除尾查
			$newWord = array();
			for ($row = 0; $row < count($case); $row++) {
				$len = mb_strlen($case[$row][1], "UTF-8");
				$end = mb_substr($search, 0 - $len, null, "UTF-8");
				if ($end == $case[$row][1]) {
					$base = mb_substr($search, 0, mb_strlen($search, "UTF-8") - $len, "UTF-8") . $case[$row][0];
					if ($base != $search) {
						$newWord[$base] = mb_strlen($case[$row][1],"UTF-8");
					}
				}
			}
			#找到最高频的base
			$base_weight = 0;
			$len = 0;
			foreach ($newWord as $x => $x_value) {
				$row = Cache::remember('palicanon/wordpart/weight/'.$search, 100 , function() use($x) {
					return WordPart::where('word',$x)->value('weight');
				});
				if ($row) {
					if ($row > $base_weight) {
						$base_weight = $row;
						$len=$x_value;
					}
				}
			}
			return array($base_weight,$len);
		}
	}

	/**
	 * 查找某个单词是否在现有词典出现
	 * 返回信心指数
	 * look up single word in dictionary vocabulary
	 * return the confidence value
	 * 
	 * 
	 * 
	 */
	public function isExsit($word, $adj_len = 0){
		$this->log("正在查询：{$word}");

		$isFound = false;
		$count = 0;
		$cacheKey = "turbosplit/part/";
		if (isset($this->part["{$word}"])) {
			$word_count = $this->part["{$word}"][0];
			$case_len = $this->part["{$word}"][1];
			if ($word_count > 0) {
				$this->log("查到：{$word}:{$word_count}个");
				$isFound = true;
				$count = $word_count + 1;
			}
		} else {
			$db = $this->dict_lookup($word);
			$word_count = $db[0];
			$case_len = $db[1];
			//加入查询缓存
			$this->part["{$word}"] = $db;
			if ($word_count > 0) {
				Log::info("查到：{$word}:{$word_count}个");
				$isFound = true;
				$count = $word_count + 1;
			}
		}
		//fomular of confidence value 信心值计算公式
		if ($isFound) {
			if (isset($this->confidence["{$word}"])) {
				$cf = $this->confidence["{$word}"];
			} else {
				$len = mb_strlen($word, "UTF-8") - $case_len;
				$len_correct = 1.2;
				$count2 = 1.1 + pow($count, 1.18);
				$conf_num = pow(1 / $count2, pow(($len - 0.5), $len_correct));
				$cf = round(1 / (1 + 640 * $conf_num), 9);
				//$cf = round((1-0.02*$case_len) / (1 + 640 * $conf_num), 9);
				$this->confidence["{$word}"] = $cf;
				Log::info("信心指数：{$word}:{$cf}");

			}
			return ($cf);
		} else {
			return (-1);
		}
	}

	/**
	 * 核心拆分函数
	 * $strWord, word to be look up 要查询的词
	 * $deep, 当前递归深度
	 * $express=true, 快速查询
	 * $adj_len=0 长度校正系数
	 * $c_threshhold 信心指数阈值
	 * 
	 * 
	 * 
	 */
	function split($strWord, $deep = 0, $express = false, $adj_len = 0, $c_threshhold = 0.8, $w_threshhold = 0.8, $forward = true, $sandhi_advance = false)
	{
		$this->log("spliting word={$strWord} deep={$deep}");
		$output = array();
		#当前搜索路径信心指数，如果过低，马上终止这个路径的搜索
		if($deep == 0){
			$this->currPathCf = 1;
		}
		//达到最大搜索深度，返回
		if ($deep >= $this->MAX_DEEP) {
			$word = "";
			$cf = 1.0;
			for ($i = 0; $i < $deep; $i++) {
				if (!empty($this->path[$i][0])) {
					$word .= $this->path[$i][0] ;
					if($isDebug) {
						$word .= "(" . $this->path[$i][1] . ")";
					}
					$word .= "+";
					$cf = $cf * $this->path[$i][1];
				}
			}
			$len = pow(mb_strlen($strWord, "UTF-8"), 3);
			$cf += (0 - $len) / ($len + 150);
			$word .= "{$strWord}";
			if ($forward == true) {
				$this->result[$word] = $cf;
				return 0;
			} else {
				$reverseWord = word_reverse($word);
				$this->result[$reverseWord] = $cf;
				return 0;
			}
			
		}
		//直接找到
		$confidence = isExsit($strWord, $adj_len);
		if ($confidence > $c_threshhold) {
			$output[] = array($strWord, "", $confidence);
		} 
		else {
			$confidence = isExsit("[" . $strWord . "]");
			if ($confidence > $c_threshhold) {
				$output[] = array("[" . $strWord . "]", "", $confidence);
			}
		}

		//如果开头有双辅音，去掉第一个辅音。因为巴利语中没有以双辅音开头的单词。
		$doubleword = "kkggccjjṭṭḍḍttddppbb";
		if (mb_strlen($strWord, "UTF-8") > 2) {
			$left2 = mb_substr($strWord, 0, 2, "UTF-8");
			if (mb_strpos($doubleword, $left2, 0, "UTF-8") !== false) {
				$strWord = mb_substr($strWord, 1, null, "UTF-8");
			}
		}

		$len = mb_strlen($strWord, "UTF-8");
		if ($len > 2) {
			if ($forward) {
				#正向切
				$this->log("正向切");
				for ($i = $len; $i > 1; $i--) {
					foreach ($this->sandhi as $key => $row) {
						//应用连音规则切分单词
						if ($sandhi_advance == false && $row["advance"] == true) {
							//continue;
						}
						if (mb_substr($strWord, $i - $row["len"], $row["len"], "UTF-8") == $row["c"]) {
							$str1 = mb_substr($strWord, 0, $i - $row["len"], "UTF-8") . $row["a"];
							$str2 = $row["b"] . mb_substr($strWord, $i, null, "UTF-8");
							$confidence = isExsit($str1, $adj_len)*$row["cf"];
							if ($confidence > $c_threshhold) {
								//信心指数大于预设的阈值，插入
								$output[] = array($str1, $str2, $confidence, $row["adj_len"]);
								$this->log("插入结构数组：{$str1} 剩余{$str2} 应用：{$row["a"]}-{$row["b"]}-{$row["c"]}");
								if ($express) {
									break;
								}
							}
						}
					}
				}
			} else {
				#反向切
				for ($i = 1; $i < $len - 1; $i++) {
					foreach ($this->sandhi as $key => $row) {
						if ($sandhi_advance == false && $row["advance"] == true) {
							//continue;
						}
						if (mb_substr($strWord, $i, $row["len"], "UTF-8") == $row["c"]) {
							$str1 = mb_substr($strWord, 0, $i, "UTF-8") . $row["a"];
							$str2 = $row["b"] . mb_substr($strWord, $i + $row["len"], null, "UTF-8");
							$confidence = isExsit($str2, $adj_len)*$row["cf"];
							if ($confidence > $c_threshhold) {
								$output[] = array($str2, $str1, $confidence, $row["adj_len"]);
								$this->log("将此次结果插入结果数组：剩余={$str2}");
								if ($express) {
									break;
								}
							}
						}
					}
				}
			}
		}
		
		$word = "";
		$this->log("结果数组个数：".count($output));
		if (count($output) > 0) {
			foreach ($output as $part) {
				$checked = $part[0];
				$remainder = $part[1];
				$this->log("剩余部分：{$remainder}");
				$this->path[$deep][0] = $checked;
				$this->path[$deep][1] = $part[2];

				if (empty($remainder)) {
					#全切完了
					$this->log("全切完了");
					$word = "";
					$cf = 1.0;
					for ($i = 0; $i < $deep; $i++) {
						$word .= $this->path[$i][0];
						if ($this->isDebug) {
							$word .= "(" . $this->path[$i][1] . ")";
						}
						$word .= "+";
						$cf = $cf * $this->path[$i][1];
					}

					if ($this->isDebug) {
						$word .= $checked . "({$part[2]})";
					} else {
						$word .= $checked;
					}
					$cf = $cf * $part[2];
					if ($cf > $w_threshhold) {
						if ($forward == true) {
							$this->result[$word] = $cf;
							return 0;
						} else {
							$reverseWord = word_reverse($word);
							$this->result[$reverseWord] = $cf;
							return 0;
						}
					}
				} else {
					#计算当前信心指数
					$cf = 1.0;
					for ($i = 0; $i < $deep; $i++) {
						$cf = $cf * $this->path[$i][1];
					}
					$this->log("计算当前信心指数:{$cf}");
					if($cf<$w_threshhold){
						$this->log("信心指数过低，提前返回 {$cf}");
						return 0;
					}else{
						#接着切
						$this->log("接着切:{$remainder}");
						$this->split($remainder, ($deep + 1), $express, $adj_len, $c_threshhold, $w_threshhold, $forward, $sandhi_advance);					
					}
				}
			}
		}else {
			#尾巴查不到了
			$this->log("尾巴查不到了");
			$word = "";
			$cf = 1.0;
			for ($i = 0; $i < $deep; $i++) {
				$word .= $this->path[$i][0];
				if ($this->isDebug) {
					$word .= "(" . $this->path[$i][1] . ")";
				}
				$word .= "+";
				$cf = $cf * $this->path[$i][1];
			}
			
			$len = pow(mb_strlen($strWord, "UTF-8"), 3);
			
			if ($forward) {
				$cf =(1-$cf) * $len / ($len + 150);
			} else {
				$cf =(1-$cf) * $len / ($len + 5);
			}
			
			if ($this->isDebug) {
				$word = $word.$strWord . "(0)";
			} else {
				$word = $word .$strWord;
			}

			if ($cf > $w_threshhold) {
				if ($forward == true) {
					$this->result[$word] = $cf;
					return 0;
				} 
				else {
					$reverseWord = word_reverse($word);
					$this->result[$reverseWord] = $cf;
					return 0;
				}
			}
		}

	}

	/**
	 * 颠倒词序
	 */
	public function word_reverse($word)
	{
		$reverse = array();
		$newword = explode("+", $word);
		$len = count($newword);
		if ($len > 0) {
			for ($i = $len - 1; $i >= 0; $i--) {
				# code...
				$reverse[] = $newword[$i];
			}
			$output = implode("+", $reverse);
			return $output;
		} else {
			return $word;
		}
	}

	/**
	 * 拆分后的处理
	 */
	public function split2($word){
		$input = explode("+",$word);
		$newword=array();
		foreach ($input as $value) {
			//去掉带小括号的调试信息
			$word = strstr($value,"(",true);
			if($word == false){
				$word = $value;
			}
			if(mb_strlen($word,"UTF-8")>4){
				# 先看有没有中文意思
				Log::info("先看有没有中文意思");
				if(UserDict::where('word',$word)->where('mean','<>','')->where('language','<>','my')->exists()){
					$newword[]=$word;
				}else{
					Log::info("如果没有查巴缅替换拆分");
					#如果没有查巴缅替换拆分
					if(UserDict::where('word',$word)->where('dict_id','61f23efb-b526-4a8e-999e-076965034e60')->exists()){
						$pmPart = explode("+",UserDict::where('word',$word)->where('dict_id','61f23efb-b526-4a8e-999e-076965034e60')->value('factors')) ;
						foreach ($pmPart as  $pm) {
							# code...
							$newword[]=$pm;
						}
					}
					else{
						Log::info("如果没有查规则变形");
						#如果没有查规则变形
						if(UserDict::where('word',$word)->where('source','_SYS_REGULAR_')->exists()){
							$rglPart = explode("+",UserDict::where('word',$word)->where('source','_SYS_REGULAR_')->value('factors')) ;
							#看巴缅有没有第一部分
							Log::info("看巴缅有没有第一部分");
							if(UserDict::where('word',$rglPart[0])->where('dict_id','61f23efb-b526-4a8e-999e-076965034e60')->exists()){
								$pmPart = explode("+",UserDict::where('word',$rglPart[0])->where('dict_id','61f23efb-b526-4a8e-999e-076965034e60')->value('factors')) ;
								foreach ($pmPart as  $pm) {
									# code...
									$newword[]=$pm;
								}
							}
							else{
								#没有
								$newword[]=$rglPart[0];
							}
							$newword[]=$rglPart[1];
						}
						else{
							#还没有就认命了
							Log::info("还没有就认命了");
							$newword[]=$word;
						}
					}
				}
			}
			else{
				$newword[]=$word;
			}

		}
		return implode("+",$newword);
	}


	/**
	 * 预处理连音词
	 */
	public function splitSandhi($word){
		$newWord = "";
		$firstWord=$word;
		do {
			$isFound = false;
			foreach ($this->sandhi2 as $key => $sandhi) {
				# code...
				$len = $sandhi["len"];
				$end = mb_substr($firstWord, 0 - $len, null, "UTF-8");
				if ($end == $sandhi["c"]) {
					$word1 = mb_substr($firstWord, 0, mb_strlen($firstWord, "UTF-8") - $len, "UTF-8") .$sandhi["a"];
					$word2 = $sandhi["b"];
					$newWord = $word2 . "-" .$newWord;
					$firstWord = $word1;
					$isFound=true;
				break;
				}
			}
		} while ($isFound);
		$newWord = $firstWord . "-" .$newWord;
		return mb_substr($newWord,0,-1, "UTF-8");
	}

	public function splitA($word){
		$output = array();
		//预处理连音词
		$word = $this->splitSandhi($word);

		# 处理双元音
		Log::info("处理双元音");
		$arrword = $this->splitDiphthong($word);
		if (count($arrword) > 1) {
			array_push($output,['word'=>$word,'factors'=>implode("+", $arrword),'confidence'=>0.9999]);
		}

		foreach ($arrword as $oneword) {
			$this->result = array(); //清空递归程序的输出容器
			
			if(mb_strlen($oneword)>35){
				//长词使用快速切分 正向切分 不使用少见sandi规则
				$this->split($oneword, 0, true, 0.8, 0.9, 0, true, false);
				$min_result = 1;
			}else{
				$this->split($oneword, 0, false, 0.8, 0.9, 0, true, false);
				$min_result=3;
			}
			Log::info("正向切分结束 结果数量".count($this->result));
			
			if(count($this->result)<$min_result){
				//有效结果过少
				$this->split($oneword, 0, false, 0.2, 0.8, 0, true, true);
				Log::info("有效结果过少 再次正切".count($this->result) );
				if(count($this->result)<2){
					$this->split($oneword, 0, false, 0.2, 0.8, 0, false, true);
					Log::info("有效结果过少 再次反切：结果数量" . count($this->result));
				}
			}

			//echo "{$start}-{$oneword}:" . count($result) . "\n";
			if (count($this->result) > 0) {
				arsort($this->result); //按信心指数排序
				$iCount = 0;
				foreach ($this->result as $row => $value) {
					array_push($output,['word'=>$oneword,'factors'=>$row,'confidence'=>$value]);

					//后处理 进一步切分没有意思的长词
					Log::info("后处理 进一步切分没有意思的长词");
					$new = $this->split2($row);
					if($new!==$row){
						array_push($output,['word'=>$oneword,'factors'=>$new,'confidence'=>$value]);
						#再处理一次
						$new2 = split2($new);
						if($new2!==$new){
							array_push($output,['word'=>$oneword,'factors'=>$new2,'confidence'=>$value]);
						}
					}
					$iCount++;
					if ($iCount > $this->MAX_RESULT2) {
						break;
					}
				}
			} else {
				Log::error("{$oneword} 切分失败");
			}
		}
		return $output;
	}

	public function setting($param=null){

	}

	public function getResult(){
		return $this->result;
	}

	private function log($message){
		if ($this->isDebug) {
			Log::info($message);
		}
	}

	private function pushResult($word,$cf){
		array_push($this->result,array($word=>$cf));
	}
}

