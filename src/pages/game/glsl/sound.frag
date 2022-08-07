#define PI 3.1415926535

vec2 mainSound(float time)
{
  return vec2(sin(6.2831*440.*time)*exp(-3.*time));
}