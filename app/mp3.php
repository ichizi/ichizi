<?php
if (@$_GET['u'] && @$_GET['t']){
    $u = $_GET['u'];
    $type = $_GET['t']?$_GET['t']:'mp3';
    $con = 'http://s.plcloud.music.qq.com/fcgi-bin/fcg_yqq_song_detail_info.fcg?songmid='.$u;
    preg_match('|var g_SongData = ({.*});|',file_get_contents($con),$data);
    function format_ErrorJson($data)
    {
        $con = str_replace('\'','"',$data);//Ìæ»»µ¥ÒýºÅÎªË«ÒýºÅ
        $con = preg_replace('/(\w+):[ {]?((?<YinHao>"?).*?\k<YinHao>[,}]?)/is', '"$1": $2',$con );//Èô¼üÃûÃ»ÓÐË«ÒýºÅÔòÌí¼Ó
        return $con;
    }
    
    $data = iconv('GBK', 'UTF-8', $data[1]);
    $obj = json_decode(format_ErrorJson($data));
    $id = $obj->id;
    //$mid = $obj->songmid;
    $url = 'http://tsmusic24.tc.qq.com/'.$id.'.'.$type;
    echo $url.'<br/>';

   // header('Location: '.$url);


}else{
    $coon =<<<EOF
<html>


<form name="input" action="" method="get">
    Mid(歌曲的mid):
    <input type="text" name="u" />
    Type（文件类型，默认MP3）:
    <input type="text" name="t" value="mp3"/>
    <input type="submit" value="Submit" />
</form>
</html>
EOF;

    echo $coon;
}
?>
