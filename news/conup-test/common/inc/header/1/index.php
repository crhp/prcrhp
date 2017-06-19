<?php
require $_SERVER['DOCUMENT_ROOT'].'/_dummyData.php';
require $_SERVER['DOCUMENT_ROOT'].'/_dummyNavData.php';

$path = "./header_1.html";
$page["page_id"] = isset($_GET['page_id']) ? $_GET['page_id'] : 0;
$page["designgroup_id"] = isset($_GET['designgroup_id']) ? $_GET['designgroup_id'] : 1;

//拡張子phpだと ssi がうまく動作しないためphpで差し替える
$regex = '<!--#include virtual="([^"]+?)" -->';

if (is_file($path)) {
    ob_start();
    include $path;
    $buffer = ob_get_contents();
    ob_get_clean();

    // $src = get_ssi($path);
    
    if (preg_match_all("/$regex/", $buffer, $match)) {
        $list = array();
        foreach ($match[0] as $key => $val) {
            $inc = $_SERVER['DOCUMENT_ROOT'] . $match[1][$key];
            if (is_file($inc)) {
                $str = get_ssi($inc);
                $list[] = array(
                    'before' => $val,
                    'after'  => $str,
                );
            }
        }
        if (! empty($list)) {
            foreach ($list as $val) {
                $buffer = str_replace($val['before'], $val['after'], $buffer);
            }
        }
    }
    echo $buffer;
}

function get_ssi($path)
{
    ob_start();
    include $path;
    return ob_get_clean();
}

?>
