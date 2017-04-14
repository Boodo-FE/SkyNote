/*
 * @author mattatz / http://mattatz.github.io/
 * */

/*
 * params
 *  theta : the amount of randomization direction
 *  attenuation : the attenuation rate of length
 *  rootRange : the range of segments for branch' parent
 * */

import * as THREE from 'three'
 
THREE.TreeSpawner = function(params) {
    params = params || {};
    this.theta = params.theta || Math.PI * 0.5; 
    this.attenuation = params.attenuation || 0.75; 

    this.rootRange = params.rootRange || new THREE.Vector2(0.75, 1.0);
};

THREE.TreeSpawner.prototype = {
    spawn : function(branch, extension) {
        var theta = this.theta;
        var atten = this.attenuation;

        var htheta = theta * 0.5;
        var x = Math.random() * theta - htheta;
        var z = Math.random() * theta - htheta;
        var len = branch.length * atten;

        var rot = new THREE.Matrix4();
        var euler = new THREE.Euler(x, 0, z);
        rot.makeRotationFromEuler(euler);
        rot.multiply(branch.rotation);

        var segmentIndex;
        extension = extension || false;
        if(extension) {
            segmentIndex = branch.segments.length - 1;
        } else {
            segmentIndex = Math.floor((Math.random() * (this.rootRange.y - this.rootRange.x) + this.rootRange.x) * branch.segments.length);
        }

        var segment = branch.segments[segmentIndex];
        return new THREE.TreeBranch({
            from : segment,
            rotation : rot,
            length : len,
            uvOffset : segment.uvOffset,
            uvLength : branch.uvLength,
            generation : branch.generation + 1,
            generations : branch.generations,
            radius : branch.radius,
            radiusSegments : branch.radiusSegments,
            heightSegments : branch.heightSegments
        });
    }
};

/*
 * params
 *  from : THREE.Vector3 or TreeSegment
 *  rotation : THREE.Matrix4
 *  length : Number
 *  generation : branch' generation from root
 *  generations : the # of generations
 * */
THREE.TreeBranch = function(params) {
    var from = params.from;
    this.rotation = params.rotation;
    this.length = params.length;

    this.generation = params.generation || 0;
    this.generations = params.generations;

    this.uvLength = params.uvLength || 10.0;
    this.uvOffset = params.uvOffset || 0.0;
    this.radius = params.radius || 0.1;
    this.radiusSegments = params.radiusSegments;
    this.heightSegments = params.heightSegments;

    if(from instanceof THREE.TreeSegment) {
        this.from = from;
        // this.position = from.position;
        this.position = from.position.clone().add(new THREE.Vector3(0, 1, 0).applyMatrix4(from.rotation).setLength(0.05));
    } else if(from instanceof THREE.Vector3) {
        this.from = null; // root branch
        this.position = from;
    } else {
        console.warning("from argument is missing !");
    }

    var direction = (new THREE.Vector3(0, 1, 0)).applyMatrix4(this.rotation);
    this.to = this.position.clone().add(direction.setLength(this.length));

    this.segments = this.buildTreeSegments(this.radius, this.radiusSegments, direction, this.heightSegments);
    this.children = [];
}

THREE.TreeBranch.prototype = {

    buildTreeSegments : function(radius, radiusSegments, direction, heightSegments) {

        // randomize control point
        var theta = Math.PI * 0.25;
        var htheta = theta * 0.5;
        var x = Math.random() * theta - htheta;
        var z = Math.random() * theta - htheta;
        var rot = new THREE.Matrix4();
        var euler = new THREE.Euler(x, 0, z);
        rot.makeRotationFromEuler(euler);
        direction.applyMatrix4(rot);
        var controlPoint = this.position.clone().add(direction.setLength(this.length * 0.5));

        var curve = new THREE.CatmullRomCurve3([this.position, controlPoint, this.to]);

        var fromRatio = this.generation == 0 ? 1.0 : 1.0 - this.generation / (this.generations + 1);
        var toRatio = 1.0 - (this.generation + 1) / (this.generations + 1);

        var fromRadius = radius * fromRatio;
        var toRadius = radius * toRatio;

        var rotation = this.rotation;

        var segments = [];
        var uvLength = this.uvLength;
        var uvOffset = this.uvOffset;
        var points = curve.getPoints(heightSegments);

        if(this.from !== null) {
            uvOffset += this.from.position.distanceTo(points[0]) / uvLength;
        }

        segments.push(new THREE.TreeSegment(points[0], rotation, uvOffset, fromRadius, radiusSegments));

        for(var i = 1; i < heightSegments; i++) {
            var p0 = points[i];
            var p1 = points[i + 1];

            var ry = i / (heightSegments - 1);
            var radius = fromRadius + (toRadius - fromRadius) * ry;
            var d = p1.distanceTo(p0);
            uvOffset += d / uvLength;

            var segment = new THREE.TreeSegment(p0, rotation, uvOffset, radius, radiusSegments);
            segments.push(segment);
        }

        return segments;
    },

    branch : function(spawner, count) {
        for(var i = 0; i < count; i++) {
            // MEMO:
            //  at least one child is an extended branch.
            this.spawn(spawner, i == 0);
        }
        this.children.forEach(function(child) {
            child.branch(spawner, count - 1);
        });
    },

    grow : function(spawner, count) {
        if(this.children.length <= 0) {
            this.branch(spawner, 1);
        } else {
            this.children.forEach(function(child) {
                child.grow(spawner);
            });
        }
    },

    spawn : function(spawner, extension) {
        var child = spawner.spawn(this, extension);
        this.children.push(child);
    },

    branchlets : function() {
        if(this.children.length == 0) {
            return this;
        } else {
            return Array.prototype.concat.apply(
                [],
                this.children.map(function(child) { return child.branchlets(); })
            );
        }
    },

    calculateLength : function() {
        var segments = this.segments;
        var length = 0;
        for(var i = 0, n = segments.length - 1; i < n; i++) {
            var p0 = segments[i].position;
            var p1 = segments[i + 1].position;
            length += p0.distanceTo(p1);
        }
        return length;
    }

};

/*
 * position : THREE.Vector3
 * rotation : THREE.Matrix4
 * */
THREE.TreeSegment = function(position, rotation, uvOffset, radius, radiusSegments) {
    this.position = position;
    this.rotation = rotation;
    this.uvOffset = uvOffset;
    this.radius = radius;

    this.vertices = [];
    this.uvs = [];

    this.build(radius, radiusSegments);
}

THREE.TreeSegment.prototype = {

    build : function(radius, radiusSegments) {
        var thetaLength = Math.PI * 2;
        for(var x = 0; x <= radiusSegments; x++) {
            var u = x / radiusSegments;
            var vertex = new THREE.Vector3(radius * Math.sin(u * thetaLength), 0, radius * Math.cos(u * thetaLength)).applyMatrix4(this.rotation).add(this.position);

            this.vertices.push(vertex);
            this.uvs.push(new THREE.Vector2(u, this.uvOffset));
        }
    }
    
};

THREE.Tree = function(params, spawner) {
    params = params || {};

    var from = params.from || new THREE.Vector3();
    var rotation = new THREE.Matrix4();
    if(params.rotation) {
        if(params.rotation instanceof THREE.Euler) {
            var euler = params.rotation;
            rotation.makeRotationFromEuler(euler);
        } else if(params.rotation instanceof THREE.Matrix4) {
            rotation = params.rotation;
        }
    }

    var length = params.length || 3.0;
    var uvLength = params.uvLength || 10.0;
    var generations = (params.generations !== undefined) ? params.generations : 5;

    var radius = params.radius || 0.1;
    this.radiusSegments = params.radiusSegments || 8;
    this.heightSegments = params.heightSegments || 8;

    this.generations = generations;
    this.root = new THREE.TreeBranch({ 
        from : from,
        rotation : rotation,
        length : length,
        uvLength : uvLength,
        generation : 0,
        generations : this.generations,
        radius : radius,
        radiusSegments : this.radiusSegments,
        heightSegments : this.heightSegments
    });

    this.spawner = spawner || new THREE.TreeSpawner();
    this.root.branch(this.spawner, this.generations);
}

THREE.Tree.prototype = {

    grow : function(count, spawner) {
        spawner = spawner || this.spawner;

        this.generation++;
        this.root.grow(spawner, count);
    },

    branchlets : function() {
        return this.root.branchlets();
    }

};

/*
 * @author mattatz / http://mattatz.github.io/
 * */

THREE.TreeGeometry = {

    /*
     * build branch surface geometry.
     * */
    build : function(tree) {
        var geometry = new THREE.Geometry();

        this.buildBranches(tree.root, geometry);
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        return geometry;
    },

    /*
     * build geometry recursively
     * */
    buildBranches : function(branch, geometry) {
        var radiusSegments = branch.radiusSegments;
        var heightSegments = branch.segments.length - 1;

        var thetaLength = Math.PI * 2;

        var vertices = [];
        var faces = [];
        var faceVertexUvs = [];

        var indices = [];
        var uvs = [];

        var index = 0;
        var offset = geometry.vertices.length;

        for(var y = 0; y <= heightSegments; y++) {

            var indicesRow = [];
            var uvsRow = [];

            var segment = branch.segments[y];

            var ry = (y + 1) / heightSegments;

            vertices = vertices.concat(segment.vertices);
            uvs.push(segment.uvs);

            for(var x = 0; x <= radiusSegments; x++) {
                indicesRow.push(index++);
            }

            indices.push(indicesRow);
        }

        for(var x = 0; x < radiusSegments; x++) {
            for(var y = 0; y < heightSegments; y++) {
                var cy = y, ny = y + 1;
                var cx = x, nx = x + 1;

                var v1 = indices[cy][cx] + offset;
                var v2 = indices[ny][cx] + offset;
                var v3 = indices[ny][nx] + offset;
                var v4 = indices[cy][nx] + offset;

                var uv1 = uvs[cy][cx];
                var uv2 = uvs[ny][cx];
                var uv3 = uvs[ny][nx];
                var uv4 = uvs[cy][nx];

                faces.push(new THREE.Face3(v1, v4, v2));
                faceVertexUvs.push([uv1, uv4, uv2]);

                faces.push(new THREE.Face3(v2, v4, v3));
                faceVertexUvs.push([uv2, uv4, uv3]);
            }
        }

        // bottom cap

        /*
         * root branch
         * */
        if(branch.from === null) {
            var bottom = branch.segments[0];
            vertices.push(bottom.position);
            indices.push(index++);

            var y = 0;

            for(var x = 0; x < radiusSegments; x++) {
                var v1 = indices[y][x] + offset;
                var v2 = indices[y][x + 1] + offset;
                var v3 = index - 1 + offset;

                var uv1 = uvs[y][x];
                var uv2 = uvs[y][x + 1];
                var uv3 = new THREE.Vector2(uv2.x, branch.uvOffset);

                faces.push(new THREE.Face3(v1, v3, v2));
                faceVertexUvs.push([uv1, uv3, uv2]);
            }
        } else {
            var from = branch.from;

            var y = 0;
            vertices = vertices.concat(from.vertices);

            var bottomIndices = [];
            for(var x = 0; x <= radiusSegments; x++) {
                bottomIndices.push((index++) + offset);
            }

            for(var x = 0; x < radiusSegments; x++) {
                var v0 = indices[y][x] + offset;
                var v1 = indices[y][x + 1] + offset;
                var v2 = bottomIndices[x];
                var v3 = bottomIndices[x + 1];

                var uv0 = uvs[y][x];
                var uv1 = uvs[y][x + 1];
                var uv2 = from.uvs[x];
                var uv3 = from.uvs[x + 1];

                faces.push(new THREE.Face3(v0, v3, v1));
                faceVertexUvs.push([uv0, uv3, uv1]);

                faces.push(new THREE.Face3(v0, v2, v3));
                faceVertexUvs.push([uv0, uv2, uv3]);
            }
        }

        geometry.vertices = geometry.vertices.concat(vertices);
        geometry.faces = geometry.faces.concat(faces);
        geometry.faceVertexUvs[0] = geometry.faceVertexUvs[0].concat(faceVertexUvs);

        var self = this;
        branch.children.forEach(function(child) {
            self.buildBranches(child, geometry);
        });
    },

    /*
     * build line strips geometry for THREE.Line object.
     * */
    buildLineStrips : function(tree) {
        var vertices = [];

        var recur = function(branch) {
            var segments = branch.segments;
            for(var i = 0, n = segments.length; i < n - 1; i++) {
                var s0 = segments[i];
                var s1 = segments[i + 1];
                vertices.push(s0.position, s1.position);
            }

            branch.children.forEach(function(child) {
                recur(child);
            });
        };
        recur(tree.root);

        var geometry = new THREE.Geometry();
        geometry.vertices = vertices;
        return geometry;
    },

    calculateLength : function(tree) {
        return this.calculateSegmentLength(tree.root);
    },

    calculateSegmentLength : function(branch) {
        var longest = 0.0;
        var self = this;
        branch.children.forEach(function(child) {
            var len = self.calculateSegmentLength(child);
            if(len > longest) {
                longest = len;
            }
        });
        return longest + branch.calculateLength();
    }

};

/*
 * @author mattatz / http://mattatz.github.io/
 * */

THREE.TreeHelper = function(system) {
    THREE.Object3D.call(this);

    this.system = system;
}

THREE.TreeHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.TreeHelper.prototype.constructor = THREE.TreeHelper;

THREE.TreeHelper.prototype.clear = function() {
    for(var i = this.children.length - 1; i >= 0; i--) {
        this.remove(this.children[i]);
    }
};

THREE.TreeHelper.prototype.showLine = function(opt) {
    this.clear();

    var geometry = THREE.TreeGeometry.buildLineStrips(this.system);
    var vertices = geometry.vertices;

    opt = opt || {};

    var line = new THREE.LineSegments(
        geometry, 
        new THREE.LineBasicMaterial({
            linewidth : opt.linewidth || 1,
            color : opt.linecolor || 0x00ff00
        })
    );
    this.add(line);

    geometry = new THREE.Geometry();
    for(var i = 0, n = vertices.length; i < n; i += 2) {
        geometry.vertices.push(vertices[i]);
    }
    var points = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size : opt.pointsize || 0.05,
            color : opt.pointcolor || 0xff0000
        })
    );
    this.add(points);

};

export default THREE.Tree



