// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITODBOBJECT_H
#define GITODBOBJECT_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/wrapper.h"
#include "node_buffer.h"
#include "../include/oid.h"
// Forward declaration.
struct git_odb_object {
};

using namespace node;
using namespace v8;

class GitOdbObject;

struct GitOdbObjectTraits {
  typedef GitOdbObject cppClass;
  typedef git_odb_object cType;

  static const bool isDuplicable = false;
  static void duplicate(git_odb_object **dest, git_odb_object *src) {
     Nan::ThrowError("duplicate called on GitOdbObject which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_odb_object *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_odb_object_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitOdbObject : public
  NodeGitWrapper<GitOdbObjectTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOdbObjectTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

             

  private:
    GitOdbObject()
      : NodeGitWrapper<GitOdbObjectTraits>(
           "A new GitOdbObject cannot be instantiated."
       )
    {}
    GitOdbObject(git_odb_object *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOdbObjectTraits>(raw, selfFreeing, owner)
    {}
    ~GitOdbObject();
             
    static NAN_METHOD(Data);

    static NAN_METHOD(Id);

    static NAN_METHOD(Size);

    static NAN_METHOD(Type);
};

#endif
