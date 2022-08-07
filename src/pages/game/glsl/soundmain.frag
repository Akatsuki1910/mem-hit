void main(){
  float t=iBlockOffset+((gl_FragCoord.x-.5)+(gl_FragCoord.y-.5)*512.)/iSampleRate;
  vec2 y=mainSound(t);
  vec2 v=floor((.5+.5*y)*65536.);
  vec2 vl=mod(v,256.)/255.;
  vec2 vh=floor(v/256.)/255.;
  gl_FragColor=vec4(vl.x,vh.x,vl.y,vh.y);
}