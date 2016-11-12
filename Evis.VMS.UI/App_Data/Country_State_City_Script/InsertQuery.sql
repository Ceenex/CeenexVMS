
select *, 
'INSERT INTO [LookUpValues]([Id], [LookUpTypeId],[ParentId],[LookUpValue],[Description],[IsActive]) VALUES('+CAST((id + 1000) as varchar)+',2, NULL,  '''+REPLACE(name, '''','''''')+''', '''+REPLACE(name, '''','''''')+''', 1 )', 
'context.LookUpValues.Add(new LookUpValues { Id = '+CAST((id + 1000) as varchar)+', LookUpTypeId = 	2	, LookUpValue = "'+name+'", Description = "	'+name+'", IsActive = true });'
from countries;


select *, 
'INSERT INTO [LookUpValues]([Id], [LookUpTypeId],[ParentId],[LookUpValue],[Description],[IsActive]) VALUES('+CAST((s.id + 1500) as varchar)+', 3,'+CAST((c.id + 1000) as varchar)+',  '''+REPLACE(s.name, '''','''''')+''', '''+REPLACE(s.name, '''','''''')+''', 1 )', 
'context.LookUpValues.Add(new LookUpValues { Id = '+CAST((s.id + 1500) as varchar)+', LookUpTypeId = 3, LookUpValue = "'+s.name+'", Description = "'+s.name+'", IsActive = true , ParentId = 	"'+CAST((c.id + 1000) as varchar)+'"	 });'
from countries c join states s
on c.id = s.country_id

select *, 
'INSERT INTO [LookUpValues]([Id], [LookUpTypeId],[ParentId],[LookUpValue],[Description],[IsActive]) VALUES('+CAST((c.id + 7000) as varchar)+',4, '+CAST((s.id + 1500) as varchar)+',  '''+REPLACE(c.name, '''','''''') +''', '''+REPLACE(c.name, '''','''''')+''', 1 )', 
'context.LookUpValues.Add(new LookUpValues { Id = '+CAST((c.id + 7000) as varchar)+'		, LookUpTypeId = 4, LookUpValue = "'+ c.name +'", Description = "'+ c.name +'", IsActive = true , ParentId = 	"'+CAST((s.id + 1500) as varchar)+'"	 });' 
from states s join cities c
on s.id = c.state_id
