export function border_radius()
{
    if(screen.height > 640) return 19.230769230769230;
    else if(screen.height > 480) return 9.615384615384615;
    return 3.846153846153846;
}