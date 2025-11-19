using System;
using API.Interfaces;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot get token key"); // The secret key for signing the token
        if (tokenKey.Length < 64)
        {
            throw new Exception("Token key must be at least 64 characters long");
        }
        // Create symmetric security key
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)); // the key to encrypt and decrypt the token

        // Create claims
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id)
        };

        // Create signing credentials
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        // Create token descriptor
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        // Create token handler and generate token

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}