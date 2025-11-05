using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// 添加 API 相关服务
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 开发环境启用 Swagger 文档
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 启用 HTTPS 重定向
app.UseHttpsRedirection();

// 🌤 模拟天气数据
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// ✅ 自定义 GET 路由：/hello 或 /hello/{name}
app.MapGet("/hello/{name?}", (string? name) =>
{
    var userName = string.IsNullOrWhiteSpace(name) ? "Guest" : name;
    return new
    {
        message = $"Hello, {userName}! 👋 Welcome to Yee's custom API.",
        time = DateTime.Now
    };
})
.WithName("Hello");

// ✅ 新增 POST 路由：/greet
app.MapPost("/greet", (GreetRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.BadRequest(new { error = "Name cannot be empty." });
    }

    var response = new
    {
        message = $"Nice to meet you, {request.Name}! 🎉",
        greetedAt = DateTime.Now
    };
    return Results.Ok(response);
})
.WithName("Greet");

// ✅ 自带的天气 API
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    return forecast;
})
.WithName("GetWeatherForecast");

// 启动应用
app.Run();

// 🌡️ 数据模型
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// 📦 POST 请求模型
record GreetRequest(string Name);