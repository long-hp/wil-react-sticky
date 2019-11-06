import React, { Component } from "react";
import Sticky from "wil-react-sticky";

export default class StickyBox2 extends Component {
  render() {
    return (
      <div>
        <div className="container" id="containerSelectorFocus">
          <div className="row">
            <div className="col-sm-3">
              <div className="box" style={{ marginBottom: 30 }}>
                <h3>Box 1</h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas posuere lacus tempus ante tristique, nec iaculis nibh
                  commodo. Nam non condimentum augue, ut rutrum elit. Cras
                  sollicitudin ante sem, quis varius dui venenatis sit amet.
                </div>
              </div>
              <Sticky
                containerSelectorFocus="#containerSelectorFocus"
                offsetTop={20}
              >
                <div className="box">
                  <h3>Short Box 2 Sticky</h3>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas posuere lacus tempus ante tristique, nec iaculis
                    nibh commodo. Nam non condimentum augue, ut rutrum elit.
                    Cras sollicitudin ante sem, quis varius dui venenatis sit
                    amet.
                  </div>
                </div>
              </Sticky>
            </div>
            <div className="col-sm-6">
              <div className="box">
                <p>
                  Etiam sit amet nulla lectus. Morbi id mauris consectetur
                  sapien euismod euismod. Fusce facilisis odio quis ipsum
                  dictum, eget bibendum ex pretium. Integer et nisl placerat,
                  rutrum tellus non, rutrum risus. Duis a magna justo.
                  Pellentesque vulputate aliquet mattis. Proin lacus arcu,
                  aliquet faucibus ligula ac, convallis blandit odio.
                  Suspendisse potenti. Aliquam placerat erat in nulla
                  ullamcorper volutpat. Proin ac tempus lectus. Phasellus
                  aliquet sodales imperdiet. Nunc sem nisl, hendrerit eget
                  feugiat euismod, bibendum et sapien. Aenean euismod fringilla
                  ipsum, vitae pellentesque sem accumsan et. Curabitur malesuada
                  elit nec ornare pharetra.
                </p>
                <img
                  src="https://images.pexels.com/photos/3012603/pexels-photo-3012603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
                <br />
                <br />
                <p>
                  Sed non turpis nunc. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Praesent sit amet felis dapibus, placerat orci quis, efficitur
                  risus. Nam libero elit, fringilla quis ornare in, maximus in
                  nibh. Curabitur placerat tincidunt nisl vitae faucibus.
                  Integer facilisis posuere turpis et suscipit. In vulputate
                  risus quis dignissim semper. In egestas gravida ante, non
                  venenatis dui pretium eget. Phasellus tellus neque,
                  pellentesque viverra metus at, pharetra volutpat mauris.
                  Pellentesque vulputate elementum metus. Integer eu nisl
                  venenatis, fringilla ipsum non, vestibulum augue. Nam sagittis
                  suscipit nisi, at congue tellus euismod vitae. Quisque quis
                  dui ut erat vulputate vehicula. Pellentesque eu nibh augue.
                  Integer vulputate rhoncus lobortis. Ut facilisis dui et lacus
                  molestie mattis. Fusce iaculis tristique velit, quis vulputate
                  nisi interdum non. Proin sed sapien vitae sapien lacinia
                  molestie. Sed ut sapien sollicitudin, eleifend orci ut, congue
                  justo. Phasellus fermentum eleifend nunc nec vestibulum.
                  Maecenas feugiat massa at ligula sodales porttitor. Vivamus eu
                  lorem vitae enim auctor auctor eu in eros. Pellentesque eu
                  hendrerit eros. Sed cursus ut mauris eu maximus. Integer et
                  dui eget enim ornare semper. Aliquam est nunc, ullamcorper in
                  ante in, tincidunt blandit est.
                </p>
                <img
                  src="https://images.pexels.com/photos/3011849/pexels-photo-3011849.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
                <br />
                <br />
                <p>
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Suspendisse gravida metus ac ex maximus sollicitudin. Nullam
                  euismod nunc congue, mollis arcu et, placerat lectus. Sed
                  mollis, dolor tincidunt ultrices faucibus, quam turpis egestas
                  risus, a finibus ligula elit sed justo. In hac habitasse
                  platea dictumst. Cras in lectus sed tellus dictum venenatis.
                  Curabitur vestibulum accumsan nisl, vel eleifend magna euismod
                  in. Sed vestibulum nunc arcu, non venenatis metus gravida
                  eget. Nunc non pulvinar urna. Fusce nibh turpis, luctus nec
                  egestas quis, tristique sed mi. Pellentesque commodo, erat
                  imperdiet sollicitudin sodales, turpis neque ornare eros, non
                  condimentum erat metus nec diam. Aenean magna sapien,
                  tristique sed pharetra a, ornare et eros. Ut sit amet ligula
                  non nisl hendrerit ornare ac vel est. Fusce rhoncus dolor quis
                  commodo ullamcorper. Maecenas orci tortor, vestibulum sed
                  maximus vitae, sagittis eget lacus. Nunc vestibulum interdum
                  arcu eu cursus. In elementum sed tortor in facilisis. Quisque
                  in mauris ac elit viverra lobortis quis in ante. Proin
                  tristique laoreet volutpat. Mauris nec ante sit amet velit
                  euismod faucibus nec nec nunc. Integer laoreet diam tellus,
                  sed faucibus velit gravida eget. Sed eleifend non tellus nec
                  accumsan.
                </p>
                <img
                  src="https://images.pexels.com/photos/2837572/pexels-photo-2837572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="box" style={{ marginBottom: 30 }}>
                <h3>Box 1</h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas posuere lacus tempus ante tristique, nec iaculis nibh
                  commodo. Nam non condimentum augue, ut rutrum elit. Cras
                  sollicitudin ante sem, quis varius dui venenatis sit amet.
                  Vivamus eu nisi sit amet turpis egestas sollicitudin a eget
                  massa. Suspendisse vel egestas justo, sed imperdiet diam. Ut
                  vestibulum nibh vitae diam vulputate, et mattis metus
                  ultrices.
                </div>
              </div>
              <Sticky
                containerSelectorFocus="#containerSelectorFocus"
                offsetTop={20}
              >
                <div className="box">
                  <h3>Long Box 2 Sticky</h3>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas posuere lacus tempus ante tristique, nec iaculis
                      nibh commodo. Nam non condimentum augue, ut rutrum elit.
                      Cras sollicitudin ante sem, quis varius dui venenatis sit
                      amet.
                    </p>
                    <img
                      src="https://images.pexels.com/photos/2248523/pexels-photo-2248523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt=""
                    />
                    <br />
                    <br />
                    <p>
                      Vivamus eu nisi sit amet turpis egestas sollicitudin a
                      eget massa. Suspendisse vel egestas justo, sed imperdiet
                      diam. Ut vestibulum nibh vitae diam vulputate, et mattis
                      metus ultrices. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Maecenas posuere lacus tempus ante
                      tristique, nec iaculis nibh commodo. Nam non condimentum
                      augue, ut rutrum elit.
                    </p>
                    <img
                      src="https://images.pexels.com/photos/2273642/pexels-photo-2273642.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt=""
                    />
                  </div>
                </div>
              </Sticky>
            </div>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/2967810/pexels-photo-2967810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
          style={{ marginTop: 100 }}
        />
      </div>
    );
  }
}
