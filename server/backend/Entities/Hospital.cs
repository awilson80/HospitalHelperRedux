using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class Hospital
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Phone { get; set; } = null!;
}
