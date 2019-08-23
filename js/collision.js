//判断大鱼和果实的距离
function momFruitsCollision()
{
	if(!data.gameOver)
	{
		for(var i = 0;i < fruit.num; i++)
		{
			if(fruit.alive[i])
			{
				//calculate length
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l <900)
				{
					//fruit eaten
					fruit.dead(i);
					data.fruitNum++;
					mom.momSwimCount++;
					if(mom.momSwimCount > 7)
					{
						mom.momSwimCount =7;
					}
					if(fruit.fruitType[i] == "blue")//blue
					{
						data.double =2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
}
//mom body collision 
function momBodyCollion()
{
	if(data.fruitNum > 0 && !data.gameOver)
	{
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l < 900)
		{
			//baby rcover
			baby.babyFadeCount = 0;
			mom.momSwimCount = 0;
			//score update
			data.addScore();
			halo.born(baby.x,baby.y);
		}
	}
}
