---
title: postgre01
date: 2024-02-06 10:00:00
categories:
- Sql
excerpt: postgre01
---
> postgre 中经常使用的脚本

```sql
行转列
unnest(string_to_array(column_name , ','))

列转行
string_agg(column_name , ',')


```

> 鉴权

```sql

permission denied for sequence XXXX_control_no_seq 

```

> 重建索引

```sql
DO 

$$

DECLARE  

  table_name text;  

BEGIN  

  FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'node' )  

  LOOP  

   BEGIN  

     EXECUTE 'ALTER TABLE node.' || table_name || ' ALTER COLUMN "id" SET START 104001' ;  

  EXCEPTION  

    WHEN OTHERS THEN  

      RAISE NOTICE 'Caught an exception: %', SQLERRM; -- 捕获并打印异常信息  

  END;  

  END LOOP;  

END 

$$

;
```

> 循环插入数据

```sql
do $$

declare

v_idx integer := 1;

begin

 while v_idx < 1000 loop

 v_idx = v_idx+1;

insert into dbo.？

( isreaded, isdeleted)

OVERRIDING SYSTEM VALUE (select isreaded, isdeleted from dbo.？as tt order by id desc limit 1);

 end loop;

end $$;

```

> 按照指定字段进行分组 并取一行

```sql
select * from ( select ROW_NUMBER() over(partition by ss.?,ss.?, order by id desc) rn,* from

"dbo"."?" as ss where ss.?=false and module='success') as sinfo where rn=1
```

> 删除表统计情报优化表性能

```sql
analyze tablename
```

> 表增加索引 提高脚本执行效率

```sql
create index i_tablename_columnname on tablename(columnname);
```
