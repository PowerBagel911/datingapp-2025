using System;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; } // For cloud storage identifier

    // Navigation property
    public Member Member { get; set; } = null!;
}
